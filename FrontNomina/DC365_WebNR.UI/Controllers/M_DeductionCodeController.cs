/// <summary>
/// Controlador para la gestión de códigos de deducción activos.
/// Permite crear, editar, eliminar e inhabilitar códigos de deducción y sus versiones.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_DeductionCode.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("codigosdeduccion")]
    public class M_DeductionCodeController : ControllerBase
    {
        ProcessDeductionCode deductionCode;
        /// <summary>
        /// Ejecuta DeductionCode de forma asincrona.
        /// </summary>
        /// <param name="version">Parametro version.</param>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> DeductionCode([FromQuery] bool version = false, [FromQuery] string id = "")
        {
            GetdataUser();
            await GetLayoutDefauld();

            deductionCode = new ProcessDeductionCode(dataUser[0]);
            var model = await deductionCode.GetAllDataAsync(_IsVersion: version, id: id);
            ViewBag.Projects = await selectListsDropDownList(SelectListOptions.Project);
            ViewBag.ProjCategory = await selectListsDropDownList(SelectListOptions.ProjCategory);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);
            ViewBag.Filter = FilterHelper<DeductionCode>.GetPropertyToSearch();
            ViewBag.Version = version;
            ViewBag.IdVersion = id;
            return View(model);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <param name="version">Parametro version.</param>

        /// <param name="internalid">Parametro internalid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id, [FromQuery] bool version = false, [FromQuery] string internalid = "")
        {
            GetdataUser();
            DeductionCode _model = new DeductionCode();
            deductionCode = new ProcessDeductionCode(dataUser[0]);


            _model = await deductionCode.GetIdDataAsync(Id, _IsVersion: version, internalid: internalid);

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
        public async Task<JsonResult> Save(DeductionCode Obj, string operacion, bool isversion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            deductionCode = new ProcessDeductionCode(dataUser[0]);


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
                        responseUI = await deductionCode.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await deductionCode.PutDataAsync(Obj.DeductionCodeId, Obj, isversion);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="DeductionCodeId">Parametro DeductionCodeId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> DeductionCodeId)
        {
            GetdataUser();
            ResponseUI responseUI;
            deductionCode = new ProcessDeductionCode(dataUser[0]);
            responseUI = await deductionCode.DeleteDataAsync(DeductionCodeId);

            return (Json(responseUI));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="DeductionCodeIddc">Parametro DeductionCodeIddc.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> DeductionCodeIddc)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            deductionCode = new ProcessDeductionCode(dataUser[0]);
            foreach (var item in DeductionCodeIddc)
            {
                responseUI = await deductionCode.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta Deduction_CodeFilter_Or_MoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <param name="IsVersion">Parametro IsVersion.</param>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Deduction_CodeFilter_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1, bool IsVersion = false, string Id = "")
        {
            GetdataUser();
            deductionCode = new ProcessDeductionCode(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await deductionCode.GetAllDataAsync(IsVersion, Id, PropertyName, PropertyValue, _PageNumber);

            return PartialView("Deduction_CodeFilter_Or_MoreData", model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="DeductionCodeId">Parametro DeductionCodeId.</param>

        /// <param name="DeductionCodeInternalId">Parametro DeductionCodeInternalId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminarVersion")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> DeleteVersion(string DeductionCodeId, int DeductionCodeInternalId)
        {
            GetdataUser();
            ResponseUI responseUI;
            deductionCode = new ProcessDeductionCode(dataUser[0]);


            responseUI = await deductionCode.DeleteVersionDataAsync(DeductionCodeId, DeductionCodeInternalId);

            return (Json(responseUI));
        }

    }
}
