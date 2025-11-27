/// <summary>
/// Controlador para la gestión de puestos vacantes.
/// Permite crear, editar, eliminar e inhabilitar puestos vacantes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_Vacants.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("vacantes")]
    public class M_VacantsController : ControllerBase
    {
        ProcessVacants processVacants;

        /// <summary>

        /// Ejecuta Vacants de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> Vacants()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processVacants = new ProcessVacants(dataUser[0]);
            var models = await processVacants.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Vacants>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(models);
        }

        /// <summary>
        /// Obtiene el identificador unico del usuario para el sistema de vistas.
        /// </summary>
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
        /// Genera un hash numerico consistente.
        /// </summary>
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

        /// Ejecuta Vacants_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Vacants_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processVacants = new ProcessVacants(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processVacants.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Vacants_Filter_OrMore_Data", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        public async Task<JsonResult> Save(Vacants Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processVacants = new ProcessVacants(dataUser[0]);

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
                        responseUI = await processVacants.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processVacants.PutDataAsync(Obj.PositionId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdPositionVacants">Parametro IdPositionVacants.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        public async Task<JsonResult> delete(List<string> IdPositionVacants)
        {
            GetdataUser();
            ResponseUI responseUI;
            processVacants = new ProcessVacants(dataUser[0]);

            responseUI = await processVacants.DeleteDataAsync(IdPositionVacants);

            return (Json(responseUI));
        }

       
        /// <summary>

       
        /// Ejecuta JobsDropDownList de forma asincrona.

       
        /// </summary>

       
        /// <returns>Resultado de la operacion.</returns>

       
        [HttpPost("BuscarCargos")]
        public async Task<JsonResult> JobsDropDownList()
        {
            GetdataUser();
            ProcessJob processJob = new ProcessJob(dataUser[0]);
            var list = await processJob.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Ejecuta PositionDropDownList de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("BuscarPuestos")]
        public async Task<JsonResult> PositionDropDownList()
        {
            GetdataUser();
            ProcessPosition processPosition = new ProcessPosition(dataUser[0]);
            var list = await processPosition.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="PositionidVacant">Parametro PositionidVacant.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> updateStatus(List<string> PositionidVacant)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processVacants = new ProcessVacants(dataUser[0]);

            foreach (var item in PositionidVacant)
            {
                responseUI = await processVacants.UpdateStatus(item);

            }

            return (Json(responseUI));
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
            Vacants _model = new Vacants();
            processVacants = new ProcessVacants(dataUser[0]);


            _model = await processVacants.GetIdDataAsync(Id);

            return (Json(_model));
        }

    }

}
