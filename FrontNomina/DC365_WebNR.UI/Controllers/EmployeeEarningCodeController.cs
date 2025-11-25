using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.ModelBinders;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("codigosgananciaempleados")]
    public class EmployeeEarningCodeController : ControllerBase
    {
        ProcessEmployeeEarningCode process;
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeEarningCode(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            ViewBag.Culture = dataUser[5];

            return PartialView("EmployeeEarningCode", list);
        }


        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Employee_EarningCode_Filter_Or_MoreData(string employeeid, string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessEmployeeEarningCode(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync(employeeid, _PageNumber, PropertyName, PropertyValue);

            return PartialView("Employee_EarningCode_Filter_Or_MoreData", model);
        }


        [HttpGet("FormNewEarningCode")]
        public async Task<ActionResult> EmployeeEarningCode()
        {
            GetdataUser();
            EmployeeEarningCode model = new EmployeeEarningCode();
            ViewBag.Paycyle = new List<SelectListItem>();
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.EarningCode = await selectListsDropDownList(SelectListOptions.EarningCodeEarning);
            ViewBag.Culture = dataUser[5];
            return PartialView("NewEmployeeEarningCode", model);
        }

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeEarningCode model, string operation, bool _IsForDGT)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeEarningCode(dataUser[0]);
            
            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                model.IsForDGT = _IsForDGT;
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

        [HttpGet("{employeeid}/{internalId}")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeEarningCode _model = new EmployeeEarningCode();
            process = new ProcessEmployeeEarningCode(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId);
            ViewBag.Paycyle = await selectListsDropDownList(SelectListOptions.PayCycles, _model.PayrollId);
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.EarningCode = await selectListsDropDownList(SelectListOptions.EarningCode);
            ViewBag.Culture = dataUser[5];
            return PartialView("NewEmployeeEarningCode", _model);
        }

        [HttpGet("Buscarcodigosganancia")]
        public async Task<JsonResult> ListEarningCode()
        {
            GetdataUser();
            ProcessEarningCodes earningCodes = new ProcessEarningCodes(dataUser[0]);
            var list = await earningCodes.GetAllDataAsync();
            return Json(list);
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_EarningCode, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeEarningCode(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_EarningCode, employeeid);

            return (Json(responseUI));
        }
    }
}
