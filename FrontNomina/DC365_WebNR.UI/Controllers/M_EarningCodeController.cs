/// <summary>
/// Controlador para la gestión de códigos de ganancia activos.
/// Permite crear, editar, eliminar e inhabilitar códigos de ganancia y sus versiones.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;


namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_EarningCode.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("codigosganancias")]
    public class M_EarningCodeController : ControllerBase
    {
        ProcessEarningCodes earningCode;
        /// <summary>
        /// Ejecuta EarningCode de forma asincrona.
        /// </summary>
        /// <param name="version">Parametro version.</param>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> EarningCode([FromQuery] bool version = false, [FromQuery] string id = "")
        {
            GetdataUser();
            await GetLayoutDefauld();
            ViewBag.Projects = await selectListsDropDownList(SelectListOptions.Project);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);
            earningCode = new ProcessEarningCodes(dataUser[0]);
            var model = await earningCode.GetAllDataAsync(_IsVersion: version, id:id);
            ViewBag.Version = version;
            ViewBag.IdVersion = id;
            ViewBag.Filter = FilterHelper<EarningCode>.GetPropertyToSearch();
            return View(model);
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
            EarningCode _model = new EarningCode();
            earningCode = new ProcessEarningCodes(dataUser[0]);


            _model = await earningCode.GetIdDataAsync(Id);

            return (Json(_model));
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <param name="isversion">Parametro isversion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EarningCode Obj, string operacion, bool isversion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            earningCode = new ProcessEarningCodes(dataUser[0]);

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
                        responseUI = await earningCode.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await earningCode.PutDataAsync(Obj.EarningCodeId, Obj, isversion);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="EarningCodeId">Parametro EarningCodeId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> EarningCodeId)
        {
            GetdataUser();
            ResponseUI responseUI;
            earningCode = new ProcessEarningCodes(dataUser[0]);


            responseUI = await earningCode.DeleteDataAsync(EarningCodeId);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="EarCodeId">Parametro EarCodeId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> EarCodeId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            earningCode = new ProcessEarningCodes(dataUser[0]);
            foreach (var item in EarCodeId)
            {
                responseUI = await earningCode.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta EarningCodes_CodeFilter_Or_MoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <param name="IsVersion">Parametro IsVersion.</param>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> EarningCodes_CodeFilter_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1, bool IsVersion = false, string Id = "")
        {
            GetdataUser();
            earningCode = new ProcessEarningCodes(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await earningCode.GetAllDataAsync(_PageNumber, IsVersion, Id, PropertyName, PropertyValue);

            return PartialView("EarningCodes_CodeFilter_Or_MoreData", model);
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="EarningCodeId">Parametro EarningCodeId.</param>


        /// <param name="EarningCodeInternalId">Parametro EarningCodeInternalId.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("eliminarVersion")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> DeleteVersion(string EarningCodeId, int EarningCodeInternalId)
        {
            GetdataUser();
            ResponseUI responseUI;
            earningCode = new ProcessEarningCodes(dataUser[0]);


            responseUI = await earningCode.DeleteVersionDataAsync(EarningCodeId, EarningCodeInternalId);

            return (Json(responseUI));
        }


    }
}
