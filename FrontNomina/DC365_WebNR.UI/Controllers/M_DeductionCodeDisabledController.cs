using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("codigosdeduccioninactivos")]
    public class M_DeductionCodeDisabledController : ControllerBase
    {
        ProcessDeductionCodeDisabled deductionCode;

        [HttpGet]
        public async Task<IActionResult> DeductionCodeDisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();

            deductionCode = new ProcessDeductionCodeDisabled(dataUser[0]);
            var model = await deductionCode.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<DeductionCode>.GetPropertyToSearch();

            return View(model);
        }

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> DeductionCodeId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            deductionCode = new ProcessDeductionCodeDisabled(dataUser[0]);
            foreach (var item in DeductionCodeId)
            {
                responseUI = await deductionCode.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> DeductionDisabled_CodeFilter_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            deductionCode = new ProcessDeductionCodeDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await deductionCode.GetAllDataAsync(false, "", PropertyName, PropertyValue, _PageNumber);

            return PartialView("DeductionDisabled_CodeFilter_Or_MoreData", model);
        }
    }
}
