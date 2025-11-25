using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    public class DashboardController : ControllerBase
    {
        ProcessUserOptions processUserOptions;
        public async Task<IActionResult> Principal()
        {
            GetdataUser();
            
            await GetLayoutDefauld();

            ViewBag.Payroll = await selectListsDropDownList(SelectListOptions.Payroll);
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> SaveOpcionesDefaultUser(string FormatCodeIdOptions, string CompanyDefaultIdoptions)
        {
            GetdataUser();
            
            UserOptions userOptions = new UserOptions()
            {
                FormatCodeId = FormatCodeIdOptions,
                CompanyDefaultId = CompanyDefaultIdoptions
            };
            processUserOptions = new ProcessUserOptions(dataUser[0]);
            var responseUI = await processUserOptions.PutDataAsync(dataUser[8], userOptions);
            if (responseUI.Errors==null)
            {
                HttpContext.Session.SetString("FormatCode", FormatCodeIdOptions);
                HttpContext.Session.SetString("CodeDefaultCompanies", CompanyDefaultIdoptions);
                var empresas = JsonConvert.DeserializeObject<List<CompanyForUser>>(dataUser[4]);
            }
            return (Json(responseUI));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> SaveChangeCompanyForm(string companyidChange)
        {
            GetdataUser();
            processUserOptions = new ProcessUserOptions(dataUser[0]);
            var responseUI = await processUserOptions.ChangeCompany(companyidChange);
            if (responseUI.Errors == null)
            {
                HttpContext.Session.SetString("Token", responseUI.Obj.Token);
                HttpContext.Session.SetString("CodeCompanies", responseUI.Obj.CompanyId);
                HttpContext.Session.SetString("NameCompanies", responseUI.Obj.Name);
            }
            return (Json(responseUI));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UploadImage(IFormFile file)
        {
            GetdataUser();
            processUserOptions = new ProcessUserOptions(dataUser[0]);
            var result = await processUserOptions.Uploadimageuser(file, dataUser[8]);
            if (result.Errors == null)
            {
                HttpContext.Session.SetString("Avatar", result.Message);
            }

            return (Json(result));
        }


        [HttpGet]
        public ActionResult Help()
        {
            return PartialView("Help");
        }

        //[HttpGet]
        //public async Task<IActionResult> txt()
        //{
        //    GetdataUser();
        //    ProcessDashboard process = new ProcessDashboard(dataUser[0]);

        //    var responseUI = await process.GetTxt();

        //    //string dato = "Esto es una prueba/n prueba salto de linea";
        //    //MemoryStream ms = new MemoryStream();
        //    //byte[] da = Encoding.UTF8.GetBytes(dato);
        //    //ms.Write(da);
        //    //ms.Seek(0, SeekOrigin.Begin);
        //    ////await responseUI.CopyToAsync(ms);
        //    return File(responseUI, "text/plain", "archivo.txt");
        //}

        [HttpGet]
        public async Task<JsonResult> GetCardInformation()
        {
            GetdataUser();

            ProcessDashboard process = new ProcessDashboard(dataUser[0]);
            var responseUI = await process.GetCardInformation();

            return Json(responseUI);
        }

        [HttpGet]
        public async Task<JsonResult> GetGraphicsInformation([FromQuery] int year, string payrollid)
        {
            GetdataUser();

            ProcessDashboard process = new ProcessDashboard(dataUser[0]);
            var responseUI = await process.GetGraphicsInformation(year, payrollid);

            return Json(responseUI);
        }
    }
}
