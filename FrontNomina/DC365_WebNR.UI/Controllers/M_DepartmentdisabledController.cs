using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    [Route("departamentosinactivos")]
    public class M_DepartmentdisabledController : ControllerBase
    {
        ProcessDepartamentDisabled processDepartament;
        [HttpGet()]
        public async Task<IActionResult> Departmentdisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);
            ViewData["ListDepartment"] = await processDepartament.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Department>.GetPropertyToSearch();

            return View();
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> deleteDepartmentDisabled(List<string> ListIdDepartmentDisabled)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);

            responseUI = await processDepartament.DeleteDataAsync(ListIdDepartmentDisabled);

            return (Json(responseUI));
        }

        [HttpPost("actualizarestatus")]
        public async Task<JsonResult> updateStatus(List<string> DepartmentId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);
            foreach (var item in DepartmentId)
            {
                responseUI = await processDepartament.UpdateStatusDepartment(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> DepartamentDisabled_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processDepartament.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("DepartamentDisabled_Filter_OrMore_Data", model);
        }
    }
}
