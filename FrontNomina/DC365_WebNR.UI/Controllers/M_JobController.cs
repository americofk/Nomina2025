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
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cargosactivos")]
    public class M_JobController : ControllerBase
    {
        ProcessJob processJob;

        [HttpGet]
        public async Task<IActionResult> Jobs()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processJob = new ProcessJob(dataUser[0]);
            var model = await processJob.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Job>.GetPropertyToSearch();

            return View(model);
        }

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

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            Job _model = new Job();
            processJob = new ProcessJob(dataUser[0]);

            _model = await processJob.GetIdDataAsync(Id);

            return (Json(_model));
        }

    }
}
