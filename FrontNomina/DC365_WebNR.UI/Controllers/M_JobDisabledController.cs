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
    [Route("cargosinactivos")]
    public class M_JobDisabledController : ControllerBase
    {
        ProcessJobDisabled processJob;

        [HttpGet]
        public async Task<IActionResult> Jobs()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processJob = new ProcessJobDisabled(dataUser[0]);
            var model = await processJob.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Job>.GetPropertyToSearch();

            return View(model);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> JobDisabled_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processJob = new ProcessJobDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processJob.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("JobDisabled_Filter_OrMore_Data", model);
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> IdJobsDisabled)
        {
            GetdataUser();
            ResponseUI responseUI;
            processJob = new ProcessJobDisabled(dataUser[0]);

            responseUI = await processJob.DeleteDataAsync(IdJobsDisabled);

            return (Json(responseUI));
        }

        [HttpPost("actualizarestatus")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> updateStatus(List<string> JobIdpos)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processJob = new ProcessJobDisabled(dataUser[0]);
            foreach (var item in JobIdpos)
            {
                responseUI = await processJob.UpdateStatus(item);

            }

            return (Json(responseUI));
        }
    }
}
