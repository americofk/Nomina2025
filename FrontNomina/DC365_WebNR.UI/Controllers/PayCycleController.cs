using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
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
    [Route("ciclopagos")]
    public class PayCycleController : ControllerBase
    {
        ProcessPayCycle process;

        [HttpGet("{payrollId}")]
        public async Task<ActionResult> Get(string payrollId)
        {
            GetdataUser();
            process = new ProcessPayCycle(dataUser[0]);

            var list = await process.GetAllDataAsync(payrollId);
            ViewBag.Culture = dataUser[5];
            ViewBag.CountPageNumber = 0;

            return PartialView("ListPayCycle", list);
        }

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(string PayrollId, int PayCycleQty)
        {
            GetdataUser();
            ResponseUI<List<PayCycle>> responseUI = new ResponseUI<List<PayCycle>>();

            if(PayCycleQty == 0)
            {
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = new List<string>() { "La cantidad no puede ser cero" };
                return Json(responseUI);
            }

            process = new ProcessPayCycle(dataUser[0]);

            responseUI = await process.PostDataAsync(PayrollId, PayCycleQty);
           
            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> IdPayCycle, string _PayrollId)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayCycle(dataUser[0]);
            IdPayCycle.Reverse();
            responseUI = await process.DeleteDataAsync(IdPayCycle, _PayrollId);

            return (Json(responseUI));
        }

        [HttpPost("marcarimpuesto")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> MarkForTax(PayCycleIsForTaxRequest model)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayCycle(dataUser[0]);

            responseUI = await process.MaxForTaxAsync(model);

            return (Json(responseUI));
        }
        [HttpPost("marcartss")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> MarkForTss(PayCycleIsForTssRequest model)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayCycle(dataUser[0]);

            responseUI = await process.MaxForTssAsync(model);

            return (Json(responseUI));
        }

        [HttpGet("moredata")]
        public async Task<ActionResult> MoreData(int pagenumber,string id)
        {
            GetdataUser();
            process = new ProcessPayCycle(dataUser[0]);

            var list = await process.GetAllDataAsync(id,pagenumber);
            ViewBag.Culture = dataUser[5];
            return PartialView("ListPayCycle", list);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> ListPayCycle_Filter_Or_MoreData(string Id,int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessPayCycle(dataUser[0]);
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(Id,_PageNumber);
            ViewBag.Culture = dataUser[5];

            return PartialView("ListPayCycle", model);
        }


    }
}
