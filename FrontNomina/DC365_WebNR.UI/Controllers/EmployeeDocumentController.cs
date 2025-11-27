/// <summary>
/// Controlador para la gestión de documentos de empleados.
/// Permite cargar, descargar, editar y eliminar documentos adjuntos a empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de EmployeeDocument.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("documentosempleados")]
    public class EmployeeDocumentController : ControllerBase
    {
        ProcessEmployeeDocument process;
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeDocument(dataUser[0]);

            ViewBag.Culture = dataUser[5];
            var list = await process.GetAllDataAsync(employeeid);
            return PartialView("ListEmployeeDocument", list);
        }

        /// <summary>

        /// Ejecuta la operacion EmployeeDepartment.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormNewEmployeeDocument")]
        public ActionResult EmployeeDepartment()
        {
            EmployeeDocument model = new EmployeeDocument();
            return PartialView("NewEmployeeDocument", model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_Document">Parametro listid_Document.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Document, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeDocument(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Document, employeeid);

            return (Json(responseUI));
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeDocument model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeDocument(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operation)
                {
                    case "1":
                        responseUI = await process.PostDataAsync(model);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(model.InternalId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalId">Parametro internalId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}/{internalId}")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeDocument _model = new EmployeeDocument();
            process = new ProcessEmployeeDocument(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId);

            return PartialView("NewEmployeeDocument", _model);
        }


        /// <summary>


        /// Descarga.


        /// </summary>


        /// <param name="IdEmployee">Parametro IdEmployee.</param>


        /// <param name="internalid">Parametro internalid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("descargardocumento")]
        public async Task<ActionResult> DownloadImage(string IdEmployee, int internalid)
        {
            GetdataUser();
            process = new ProcessEmployeeDocument(dataUser[0]);
            var result = await process.DownloadDocument(IdEmployee, internalid);

            byte[] doc;
            if (result.Type == ErrorMsg.TypeOk)
            {
                doc = Convert.FromBase64String(result.Obj.Content);
                return File(doc, "application/pdf", result.Obj.FileName);
            }

            return RedirectToAction("Index", "Error");
        }


        /// <summary>


        /// Carga un archivo.


        /// </summary>


        /// <param name="file">Parametro file.</param>


        /// <param name="IdEmpleyee">Parametro IdEmpleyee.</param>


        /// <param name="internalid">Parametro internalid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("cargardocumento")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UploadDocument(IFormFile file, string IdEmpleyee, int internalid)
        {
            GetdataUser();
            
            process = new ProcessEmployeeDocument(dataUser[0]);
            var result = await process.UploadDocument(file, IdEmpleyee, internalid);

            return (Json(result));
        }

    }
}
