/// <summary>
/// Controlador para la gestión de impuestos activos.
/// Permite crear, editar, eliminar e inhabilitar configuraciones de impuestos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de Tax.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("impuestos")]
    public class TaxController : ControllerBase
    {
        ProcessTax process;
        /// <summary>
        /// Ejecuta Taxs de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> Taxs()
        {
            GetdataUser();
            process = new ProcessTax(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Tax>.GetPropertyToSearch();

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

        /// Ejecuta NewAndEditTax de forma asincrona.

        /// </summary>

        /// <param name="taxid">Parametro taxid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("ObtenerFormNuevo")]
        public async Task<IActionResult> NewAndEditTax([FromQuery] string taxid)
        {
            Tax model;
            GetdataUser();

            process = new ProcessTax(dataUser[0]);

            if (!string.IsNullOrEmpty(taxid))
            {
                //Editar
                model = await process.GetDataAsync(taxid);
            }
            else
            {
                //Nuevo
                model = new Tax();
            }

            ViewBag.Projects = await selectListsDropDownList(SelectListOptions.Project);
            ViewBag.ProjCategories = await selectListsDropDownList(SelectListOptions.ProjCategory);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);
            ViewBag.Currencies = await selectListsDropDownList(SelectListOptions.Currency);

            return PartialView("NewAndEditTax", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(Tax model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessTax(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(model.TaxId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="listid_Tax">Parametro listid_Tax.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Tax)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessTax(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Tax);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="listid_Tax">Parametro listid_Tax.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> listid_Tax)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessTax(dataUser[0]);
            foreach (var item in listid_Tax)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }


        /// <summary>


        /// Ejecuta TaxFilterOrMoreData de forma asincrona.


        /// </summary>


        /// <param name="PropertyName">Parametro PropertyName.</param>


        /// <param name="PropertyValue">Parametro PropertyValue.</param>


        /// <param name="_PageNumber">Parametro _PageNumber.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> TaxFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessTax(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("TaxFilterOrMoreData", model);
        }

        /// <summary>
        /// Obtiene un registro por su ID para el modal de auditoría.
        /// </summary>
        /// <param name="taxid">Identificador del impuesto.</param>
        /// <returns>Datos del impuesto en formato JSON.</returns>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(string taxid)
        {
            GetdataUser();
            Tax _model = new Tax();
            process = new ProcessTax(dataUser[0]);

            _model = await process.GetDataAsync(taxid);

            return (Json(_model));
        }
    }
}
