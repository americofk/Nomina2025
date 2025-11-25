using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("impuestosinactivos")]
    public class TaxDisabledController : ControllerBase
    {
        ProcessTaxDisabled process;
        [HttpGet]
        

        public async Task<IActionResult> TaxsDidabled()
        {
            GetdataUser();
            process = new ProcessTaxDisabled(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Tax>.GetPropertyToSearch();

            return View(model);
        }

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> listid_Tax)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessTaxDisabled(dataUser[0]);
            foreach (var item in listid_Tax)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }
        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> TaxDisabledFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessTaxDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("TaxDisabledFilterOrMoreData", model);
        }


    }
}
