using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
   
    public class LoginController : Controller
    {
        Login _login = new Login();
        [HttpGet]
        public IActionResult Index()
        {
            //if (!string.IsNullOrEmpty(HttpContext.Session.GetString("NameUser")))
            //{
            //    return  new RedirectToRouteResult(
            //                            new RouteValueDictionary
            //                            {
            //                            { "action", "Dashboard" },
            //                            { "controller", "Principal" }
            //                            });
            //}
            
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }

        //validar correo
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> ValidateEmail(string _email)
        {
            var a = FormatEmail(_email);
            if (a != null)
                return Json(a);         
           
            ValidateLogin validateLogin = new ValidateLogin
            {
                Email = _email,
                IsValidateUser = true
            };

            var dato = await _login.ValidaEmailUser(validateLogin);
            return (Json(dato));
        }

        //valida clave de usuario 
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> ValidartePassword(string Password, string correo)
        {
            var a = FormatEmail(correo);
            if (a != null)
                return Json(a);

            Response<UserResponse> responseProcess = null;
            ResponseUI responseUI = new ResponseUI();

            try
            {
                if (string.IsNullOrEmpty(Password))
                {
                    responseUI.Message = "La contraseña" + ErrorMsg.Emptyf;
                    responseUI.Type = ErrorMsg.TypeError;
                    return (Json(responseUI));
                }

                string _password = HashMd5.GetMD5(Password);
                ValidateLogin validateLogin = new ValidateLogin
                {
                    Email = correo,
                    Password = _password,
                    IsValidateUser = false
                };

                responseProcess = (Response<UserResponse>)await _login.ValidaLogin(validateLogin);

                if (responseProcess.Succeeded)
                {
                    HttpContext.Session.SetString("NameUser", responseProcess.Data.Name ?? string.Empty);
                    HttpContext.Session.SetString("Alias", responseProcess.Data.Alias ?? string.Empty);
                    HttpContext.Session.SetString("Token", responseProcess.Data.Token ?? string.Empty);
                    HttpContext.Session.SetString("FormatCode", responseProcess.Data.FormatCode ?? string.Empty);
                    HttpContext.Session.SetString("Avatar", string.IsNullOrEmpty(responseProcess.Data.Avatar)?string.Empty:String.Format("data:image/jpg;base64,{0}", responseProcess.Data.Avatar));
                    HttpContext.Session.SetString("LisCompanies", JsonConvert.SerializeObject(responseProcess.Data.UserCompanies));
                    HttpContext.Session.SetString("CodeCompanies", responseProcess.Data.DefaultCompany ?? string.Empty);
                    HttpContext.Session.SetString("CodeDefaultCompanies", responseProcess.Data.DefaultCompany ?? string.Empty);

                    var defaultCompany = responseProcess.Data.UserCompanies?.Find(x => x.companyId == responseProcess.Data.DefaultCompany);
                    HttpContext.Session.SetString("NameCompanies", defaultCompany?.name ?? string.Empty);

                    HttpContext.Session.SetString("Email", responseProcess.Data.Email ?? string.Empty);

                    string menu = consultaMenu(responseProcess.Data.Token);
                    HttpContext.Session.SetString("Menu", menu ?? string.Empty);
                }

            }
            catch (Exception ex)
            {
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Message = $"Error: {ex.Message} | StackTrace: {ex.StackTrace}";
                return (Json(responseUI));
            }

            responseUI.Type = responseProcess.Type;
            responseUI.Message = responseProcess.Message;
            return (Json(responseUI));
        }

        public string consultaMenu(string token)
        {
            Menu menuLeft = new Menu(token);
            var menu = menuLeft.ResultMenuLeft().Result;

            return menu.Obj;
        }

        //solicitar contraseña provicional
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Requestchangepassword(string _email)
        {
            ResponseUI responseUI = new ResponseUI();

            var a = FormatEmail(_email);
            if (a != null)
                return Json(a);

            responseUI = await _login.Requestchangepassword(_email);
            return (Json(responseUI));
        }

        //solicitar cambio de  contraseña 
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Sendnewpassword(Sendnewpassword Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = ErrorMsg.TypeError;
                return (Json(responseUI));
            }
            else
            {
                Obj.NewPassword = HashMd5.GetMD5(Obj.NewPassword);
                responseUI = await _login.Sendnewpassword(Obj);
                return (Json(responseUI));
            }
        }

        private ResponseUI FormatEmail(string _email)
        {
            ResponseUI responseUI = new ResponseUI();

            if (string.IsNullOrEmpty(_email))
            {
                responseUI.Message = "Correo" + ErrorMsg.Emptym;
                responseUI.Errors = new List<string>() { "Correo" + ErrorMsg.Emptym };
                responseUI.Type = ErrorMsg.TypeError;
                return responseUI;
            }

            Regex regex = new Regex("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");

            if (!regex.IsMatch(_email))
            {
                responseUI.Message = ErrorMsg.Email;
                responseUI.Errors = new List<string>() { ErrorMsg.Email };
                responseUI.Type = ErrorMsg.TypeError;
                return responseUI;
            }

            return null;
        }
    }
}
