using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("nominasinactivas")]
    public class PayrollDisabledController : ControllerBase
    {
        ProcessPayrollDisabled process;
        [HttpGet]
        public async Task<IActionResult> PayrollsDisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessPayrollDisabled(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Payroll>.GetPropertyToSearch();
            return View(model);
        }

        [HttpPost("actualizarestatus")]
        public async Task<JsonResult> updateStatus(List<string> payrollIdOp)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessPayrollDisabled(dataUser[0]);

            foreach (var item in payrollIdOp)
            {
                responseUI = await process.UpdateStatus(item);
            }

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Payroll_Disabled_Filter_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessPayrollDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);
            return PartialView("Payroll_Disabled_Filter_Or_MoreData", model);
        }
    }
}
