using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("codigosgananciainactivos")]
    public class M_EarningCodeDisabledController : ControllerBase
    {
        ProcessEarningCodeDisabled process;
        [HttpGet]
        public async Task<IActionResult> EarningCodeDisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessEarningCodeDisabled(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<EarningCode>.GetPropertyToSearch();
            return View(model);
        }

        

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> EarCodeId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEarningCodeDisabled(dataUser[0]);
            foreach (var item in EarCodeId)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> EarningCodes_Disabled_CodeFilter_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessEarningCodeDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(_PageNumber, false, "", PropertyName, PropertyValue);

            return PartialView("EarningCodes_Disabled_CodeFilter_Or_MoreData", model);
        }

    }
}
