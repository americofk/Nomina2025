using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("prestamosinactivos")]
    public class LoanDisabledController : ControllerBase
    {
        ProcessLoanDisabled process;
        [HttpGet]
        public async Task<IActionResult> LoansDisabled()
        {
            GetdataUser();
            process = new ProcessLoanDisabled(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Loan>.GetPropertyToSearch();

            return View(model);
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Loans)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessLoanDisabled(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Loans);

            return (Json(responseUI));
        }

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> listid_Loans)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessLoanDisabled(dataUser[0]);
            foreach (var item in listid_Loans)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> LoansFilteOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessLoanDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("LoansFilter", model);
        }

    }
}
