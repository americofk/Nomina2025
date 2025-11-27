/// <summary>
/// Controlador para la gestión de usuarios del sistema.
/// Permite crear, editar, eliminar usuarios y administrar roles y permisos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
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
    
    /// <summary>
    
    /// Controlador para gestion de M_User.
    
    /// </summary>
    
    [UserAttribute]
    [Route("usuarios")]
    [TypeFilter(typeof(LicenseFilter))]
    public class M_UserController : ControllerBase
    {
        ProcessUser processUser;
        /// <summary>
        /// Ejecuta Users de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> Users()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processUser = new ProcessUser(dataUser[0]);
            var model = await processUser.GetAllDataAsync();

            ViewBag.Filter = FilterHelper<User>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        /// <summary>
        /// Obtiene el identificador unico del usuario para el sistema de vistas.
        /// Genera un hash numerico consistente basado en el Alias del usuario.
        /// </summary>
        /// <returns>Identificador numerico del usuario.</returns>
        private long GetUserRecIdFromSession()
        {
            var alias = dataUser[8];
            if (!string.IsNullOrEmpty(alias))
            {
                return GetConsistentHash(alias);
            }

            var email = dataUser[7];
            if (!string.IsNullOrEmpty(email))
            {
                return GetConsistentHash(email);
            }

            return 0;
        }

        /// <summary>
        /// Genera un hash numerico consistente que no varia entre ejecuciones.
        /// </summary>
        /// <param name="input">Cadena de entrada.</param>
        /// <returns>Hash numerico positivo.</returns>
        private long GetConsistentHash(string input)
        {
            if (string.IsNullOrEmpty(input)) return 0;

            long hash = 5381;
            foreach (char c in input)
            {
                hash = ((hash << 5) + hash) + c;
            }
            return System.Math.Abs(hash);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);

            User _model = await processUser.GetIdDataAsync(Id);
            return (Json(_model));
        }

        //Empresas asignadas al usuario
        /// <summary>
        /// Busca.
        /// </summary>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Busca.
        /// </summary>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Busca.
        /// </summary>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Descarga.
        /// </summary>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("descargarimagen")]
        public async Task<JsonResult> DownloadImage(string Alias)
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);
            var result = await processUser.Downloadimageuser(Alias);

            return (Json(result));
        }


        //Modal empresas
        /// <summary>
        /// Ejecuta ModalCompanies de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("modalempresas")]
        public async Task<ActionResult> ModalCompanies()
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);
            var model = await processUser.GetAllDataCompany();

            return PartialView("ModalCompanies", model);
        }
        
        //Modal roles
        /// <summary>
        /// Ejecuta ModalRoles de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("modalroles")]
        public async Task<ActionResult> ModalRoles()
        {
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);            
            var model = await processUser.GetAllMenuGeneral();

            return PartialView("ModalRoles", model);
        }


        //Guardar - editar usuario
        /// <summary>
        /// Guarda los cambios.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <param name="operacion">Parametro operacion.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="users">Parametro users.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Guarda los cambios.
        /// </summary>
        /// <param name="roles">Parametro roles.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Guarda los cambios.
        /// </summary>
        /// <param name="companies">Parametro companies.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="companies">Parametro companies.</param>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="roles">Parametro roles.</param>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Carga un archivo.
        /// </summary>
        /// <param name="file">Parametro file.</param>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPost("cargarimagen")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UploadImage(IFormFile file , string Alias)
        {           
            GetdataUser();
            processUser = new ProcessUser(dataUser[0]);
            var result= await processUser.Uploadimageuser(file, Alias);

            return (Json(result));
        }

        /// <summary>

        /// Ejecuta la operacion Help.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("ayuda")]
        public ActionResult Help()
        {
            return PartialView("Help");
        }


        /// <summary>


        /// Ejecuta User_Filte_Or_MoreData de forma asincrona.


        /// </summary>


        /// <param name="PropertyName">Parametro PropertyName.</param>


        /// <param name="PropertyValue">Parametro PropertyValue.</param>


        /// <param name="_PageNumber">Parametro _PageNumber.</param>


        /// <returns>Resultado de la operacion.</returns>


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
