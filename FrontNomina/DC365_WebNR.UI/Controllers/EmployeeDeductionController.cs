using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
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
    [Route("codigosdeduccionesempleados")]
    public class EmployeeDeductionController : ControllerBase
    {
        ProcessEmployeeDeductionCode process;
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeDeductionCode(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            ViewBag.Culture = dataUser[5];

            return PartialView("ListEmployeeDeductionCode", list);
        }

        [HttpGet("FormNewEmployeeDeductionCode")]
        public async Task<ActionResult> EmployeeDeductionCode()
        {
            GetdataUser();
            ViewBag.Payroll = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.DeductionCode = await selectListsDropDownList (SelectListOptions.DeductionCode);
            ViewBag.Paycyle = new List<SelectListItem>();
            EmployeeDeductionCode model = new EmployeeDeductionCode();
            return PartialView("NewEmployeeDeductionCode", model);
        }

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeDeductionCode model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeDeductionCode(dataUser[0]);

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

        [HttpGet("{employeeid}/{internalId}")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeDeductionCode _model = new EmployeeDeductionCode();
            process = new ProcessEmployeeDeductionCode(dataUser[0]);
            ViewBag.Payroll = null;
            ViewBag.DeductionCode = null;

            _model = await process.GetDataAsync(employeeid, internalId);
            ViewBag.Paycyle = await selectListsDropDownList(SelectListOptions.PayCycles, _model.PayrollId);

            return PartialView("NewEmployeeDeductionCode", _model);
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_DeductionCode, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeDeductionCode(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_DeductionCode, employeeid);

            return (Json(responseUI));
        }

        [HttpGet("Buscarcodigosdeducciones")]
        public async Task<JsonResult> ListDeductionCode()
        {
            GetdataUser();
            ProcessDeductionCode DeductionCode = new ProcessDeductionCode(dataUser[0]);
            var list = await DeductionCode.GetAllDataAsync();
            return Json(list);
        }
    }
}
