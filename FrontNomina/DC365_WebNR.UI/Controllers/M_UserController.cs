using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    
    [UserAttribute]
    [Route("usuarios")]
    [TypeFilter(typeof(LicenseFilter))]
    public class M_UserController : ControllerBase
    {
        ProcessUser processUser;
        [HttpGet]
        public async Task<IActionResult> Users()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processUser = new ProcessUser(dataUser[0]);
            var model = await processUser.GetAllDataAsync();

            ViewBag.Filter = FilterHelper<User>.GetPropertyToSearch();

            return View(model);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);

            User _model = await processUser.GetIdDataAsync(Id);
            return (Json(_model));
        }

        //Empresas asignadas al usuario
        [HttpGet("BuscarEmpresasUsuario")]
        public async Task<ActionResult> SearchUserCompanies(string Alias)
        {
            GetdataUser();
            ProcessCompany processCompanies = new ProcessCompany(dataUser[0]);
            List<CompanyForUser> companyForUsers = new List<CompanyForUser>();

            companyForUsers = await processCompanies.GetAllDataAsyncToUser(Alias);
            return PartialView("CompanyForUser", companyForUsers);
        }

        //Roles asignados al usuario
        [HttpGet("BuscarRolUsuario")]
        public async Task<ActionResult> SearchUserRol(string Alias)
        {
            GetdataUser();
            Menu processRol = new Menu(dataUser[0]);
            List<MenuAssignedToUser> menuApps = new List<MenuAssignedToUser>();

            menuApps = await processRol.MenuAssignedToUser(Alias);

            return PartialView("RolForUser", menuApps);

        }

        //Empresas asignadas al usuario en formato lista
        [HttpGet("BuscarListaEmpresa")]
        public async Task<JsonResult> SearchListUserCompanies(string Alias)
        {
            GetdataUser();
            ProcessCompany processCompanies = new ProcessCompany(dataUser[0]);
            List<CompanyForUser> companyForUsers = new List<CompanyForUser>();

            companyForUsers = await processCompanies.GetAllDataAsyncToUser(Alias);

            return Json(companyForUsers);
        }

        //imagen perfil
        [HttpGet("descargarimagen")]
        public async Task<JsonResult> DownloadImage(string Alias)
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);
            var result = await processUser.Downloadimageuser(Alias);

            return (Json(result));
        }


        //Modal empresas
        [HttpGet("modalempresas")]
        public async Task<ActionResult> ModalCompanies()
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);
            var model = await processUser.GetAllDataCompany();

            return PartialView("ModalCompanies", model);
        }
        
        //Modal roles
        [HttpGet("modalroles")]
        public async Task<ActionResult> ModalRoles()
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);            
            var model = await processUser.GetAllMenuGeneral();

            return PartialView("ModalRoles", model);
        }


        //Guardar - editar usuario
        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(User Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processUser = new ProcessUser(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operacion)
                {
                    case "1":
                        responseUI = await processUser.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processUser.PutDataAsync(Obj.Alias, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        //Eliminar usuario
        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> users)
        {
            GetdataUser();
            ResponseUI responseUI;
            processUser = new ProcessUser(dataUser[0]);

            responseUI = await processUser.DeleteDataAsync(users);

            return (Json(responseUI));
        }

        //Asignar rol
        [HttpPost("guardarRol")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> SaveRol(List<MenuAssignedToUser> roles)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            Menu processRol = new Menu(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                responseUI = await processRol.PostDataAsync(roles);
            }

            return (Json(responseUI));
        }

        //Asignar empresa
        [HttpPost("guardarEmpresas")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> SaveCompanies(List<CompanyForUser> companies)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            ProcessCompany processCompanies = new ProcessCompany(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                responseUI = await processCompanies.PostDataAsync(companies);
            }

            return (Json(responseUI));
        }
       
        //Eliminar empresa
        [HttpPost("eliminarEmpresasAsignadas")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> DeleteCompaniesfromUser(List<string> companies, string Alias)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            ProcessCompany processCompanies = new ProcessCompany(dataUser[0]);

            responseUI = await processCompanies.DeleteDataAsyncFromUser(companies, Alias);

            return (Json(responseUI));
        }

        //Eliminar rol
        [HttpPost("eliminarRolesAsignadas")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> DeleteRolfromUser(List<string> roles, string Alias)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            Menu processRol = new Menu(dataUser[0]);

            responseUI = await processRol.DeleteDataAsyncFromUser(roles, Alias);

            return (Json(responseUI));
        }

        //Subir imagen
        [HttpPost("cargarimagen")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UploadImage(IFormFile file , string Alias)
        {           
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);
            var result= await processUser.Uploadimageuser(file, Alias);

            return (Json(result));
        }

        [HttpGet("ayuda")]
        public ActionResult Help()
        {
            return PartialView("Help");
        }


        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> User_Filte_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processUser.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("User_Filte_Or_MoreData", model);
        }

    }
}
