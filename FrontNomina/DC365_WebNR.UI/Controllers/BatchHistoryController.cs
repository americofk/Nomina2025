/// <summary>
/// Controlador para el historial de procesamiento por lotes.
/// Permite cargar archivos masivos, descargar plantillas y ver historial de procesos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de BatchHistory.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("historiallotes")]
    public class BatchHistoryController : ControllerBase
    {
        private readonly IWebHostEnvironment webHost;
        ProcessBatchHistory process;
        public BatchHistoryController(IWebHostEnvironment _webHost)
        {
            webHost = _webHost;
        }

        /// <summary>

        /// Ejecuta BatchHistory de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> BatchHistory()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessBatchHistory(dataUser[0]);
            var model = await process.GetAllDataAsync();

           

            ViewBag.Filter = FilterHelper<BatchHistory>.GetPropertyToSearch();
            
            return View(model);
        }

        /// <summary>

        /// Descarga.

        /// </summary>

        /// <param name="typeEntity">Parametro typeEntity.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("DownloadFile")]
        public IActionResult DownloadFile(BatchEntity typeEntity)
        {
            try
            {
                var filePath = Path.Combine(webHost.ContentRootPath, @$"TemplateBatch\Plantilla_{typeEntity}.xlsx");
                var fs = new FileStream(filePath, FileMode.Open);
                return File(fs, "application/octet-stream", $"Plantilla_{typeEntity.ToString()}.xlsx");
            }
            catch (Exception)
            {

                return RedirectToAction("Index", "Error");
            }


        }

        /// <summary>

        /// Ejecuta ReadFile de forma asincrona.

        /// </summary>

        /// <param name="_file">Parametro _file.</param>

        /// <param name="_entity">Parametro _entity.</param>

        /// <param name="_optionSeparator">Parametro _optionSeparator.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> ReadFile(IFormFile _file, BatchEntity _entity, string _optionSeparator)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessBatchHistory(dataUser[0]);

            if (_file == null)
            {
                responseUI.Type = ErrorMsg.TypeError;

                responseUI.Errors = new List<string>() { "Error en archivo, debe seleccionar un archivo" };
            }
            else
            {
                try
                {
                    responseUI = await process.PostDataAsync(_file, _entity, _optionSeparator);
                }
                catch (Exception ex)
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = new List<string>() { ex.Message }; 
                }
            }



            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta BatchHistoryFilterOrMoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> BatchHistoryFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessBatchHistory(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("BatchHistoryFilterOrMoreData", model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="processid">Parametro processid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> processid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessBatchHistory(dataUser[0]);

            responseUI = await process.DeleteDataAsync(processid);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta la operacion InfoProcess.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("InfoProcess")]
        public ActionResult InfoProcess()
        {
            return PartialView("InfoProcess");
        }
    }
}
