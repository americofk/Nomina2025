/// <summary>
/// Controlador para la gestión de cargos activos.
/// Permite crear, editar, eliminar e inhabilitar cargos de la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_Job.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cargosactivos")]
    public class M_JobController : ControllerBase
    {
        ProcessJob processJob;

        /// <summary>

        /// Ejecuta Jobs de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> Jobs()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processJob = new ProcessJob(dataUser[0]);
            var model = await processJob.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Job>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
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

        /// Ejecuta Job_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Job_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processJob = new ProcessJob(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processJob.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Job_Filter_OrMore_Data", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(Job Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processJob = new ProcessJob(dataUser[0]);

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
                        responseUI = await processJob.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processJob.PutDataAsync(Obj.JobId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdJobs">Parametro IdJobs.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> IdJobs)
        {
            GetdataUser();
            ResponseUI responseUI;
            processJob = new ProcessJob(dataUser[0]);

            responseUI = await processJob.DeleteDataAsync(IdJobs);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="JobIdpos">Parametro JobIdpos.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> updateStatus(List<string> JobIdpos)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processJob = new ProcessJob(dataUser[0]);
            foreach (var item in JobIdpos)
            {
                responseUI = await processJob.UpdateStatus(item);

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
            Job _model = new Job();
            processJob = new ProcessJob(dataUser[0]);

            _model = await processJob.GetIdDataAsync(Id);

            return (Json(_model));
        }

        /// <summary>
        /// Obtiene un cargo por Id (para auditoría).
        /// </summary>
        /// <param name="Id">Parametro Id.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(string Id)
        {
            GetdataUser();
            Job _model = new Job();
            processJob = new ProcessJob(dataUser[0]);

            _model = await processJob.GetIdDataAsync(Id);

            return (Json(_model));
        }

    }
}
