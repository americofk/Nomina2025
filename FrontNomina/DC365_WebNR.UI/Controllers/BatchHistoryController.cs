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

        [HttpGet("InfoProcess")]
        public ActionResult InfoProcess()
        {
            return PartialView("InfoProcess");
        }
    }
}
