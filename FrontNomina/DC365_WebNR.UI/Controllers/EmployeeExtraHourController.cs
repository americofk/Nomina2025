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
    [Route("horasextrasempleado")]
    public class EmployeeExtraHourController : ControllerBase
    {
        ProcessEmployeeExtraHour process;

        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            ViewBag.Culture = dataUser[5];
            process = new ProcessEmployeeExtraHour(dataUser[0]);
            var list = await process.GetAllDataAsync(employeeid);

            return PartialView("EmployeeExtraHour", list);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Employee_ExtraHour_Filter_Or_MoreData(string employeeid, string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessEmployeeExtraHour(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync(employeeid, _PageNumber, PropertyName, PropertyValue);

            return PartialView("Employee_ExtraHour_Filter_Or_MoreData", model);
        }


        [HttpGet("FormNewEmployeeExtraHour")]
        public async Task<ActionResult> EmployeeExtraHour()
        {
            GetdataUser();
            EmployeeExtraHour model = new EmployeeExtraHour();
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.EarningCodehours = await selectListsDropDownList(SelectListOptions.EarningCodehours);
            return PartialView("NewEmployeeExtraHour", model);
        }

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeExtraHour model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeExtraHour(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operation)
                {
                    case "1":
                        responseUI = await process.PostDataAsync(model);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(model.EmployeeId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }

        [HttpGet("{employeeid}/{earningcode}/{workedday}")]
        public async Task<ActionResult> GetId(string employeeid, string earningcode, string workedday)
        {
            GetdataUser();
            EmployeeExtraHour _model;
            process = new ProcessEmployeeExtraHour(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, earningcode, workedday);
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.EarningCodehours = await selectListsDropDownList(SelectListOptions.EarningCodehours);

            return PartialView("NewEmployeeExtraHour", _model);
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<EmployeeExtraHourDelete> model, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeExtraHour(dataUser[0]);

            responseUI = await process.DeleteDataAsync(model, employeeid);

            return (Json(responseUI));
        }

    }
}
