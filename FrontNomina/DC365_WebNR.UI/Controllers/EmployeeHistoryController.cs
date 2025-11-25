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
    [Route("historialempleado")]
    public class EmployeeHistoryController : ControllerBase
    {
        ProcessEmployeeHistory process;

        [HttpGet]
        public async Task<IActionResult> EmployeeHistory(string employeeid, string name)
        {
            GetdataUser();
            process = new ProcessEmployeeHistory(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync(employeeid);
            ViewBag.Filter = FilterHelper<EmployeeHistoryResponse>.GetPropertyToSearch();
            ViewBag.employeData = name;
            return View(model);
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<EmployeeHistoryDeleteRequest> listid, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeHistory(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid, employeeid);

            return (Json(responseUI));
        }

        [HttpGet("FormUpdateEmployeeHistory")]
        public ActionResult FormUpdateEmployeeHistory()
        {
            GetdataUser();
            return PartialView("ModalUpdateEmployeeHistory");
        }

        [HttpPost("UpdateEmployeeHistory")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UpdateEmployeeHistory(EmployeeHistoryUpdateRequest  request, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeHistory(dataUser[0]);

            responseUI = await process.PutDataAsync(employeeid, request);
            return (Json(responseUI));
        }

        [HttpPost("marcarparadgt")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> MarkForDgt(EmployeeHistoryIsForDGTRequest model)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeHistory(dataUser[0]);

            responseUI = await process.MaxForDgtAsync(model);

            return (Json(responseUI));
        }
    }
}
