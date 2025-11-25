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
    [Route("prestamosempleados")]
    public class EmployeeLoanController : ControllerBase
    {
        ProcessEmployeeLoan process;
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeLoan(dataUser[0]);
            var list = await process.GetAllDataAsync(employeeid);
            ViewBag.Culture = dataUser[5];
            return PartialView("EmployeeLoans", list);
        }

        [HttpGet("FormNewEmployeeLoans")]
        public async Task<ActionResult> EmployeeEmployeeLoans()
        {
            GetdataUser();
            EmployeeLoan model = new EmployeeLoan();
            ViewBag.Paycyle = new List<SelectListItem>();
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Loan = await selectListsDropDownList(SelectListOptions.Loan);
            return PartialView("NewEmployeeLoans", model);
        }


        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(EmployeeLoan model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeLoan(dataUser[0]);

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

        [HttpGet("{employeeid}/{loanid}")]
        public async Task<ActionResult> GetId(string employeeid, string loanid)
        {
            GetdataUser();
            EmployeeLoan _model;
            process = new ProcessEmployeeLoan(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, loanid);
            ViewBag.Paycyle = await selectListsDropDownList(SelectListOptions.PayCycles, _model.PayrollId);
            ViewBag.Payrolls = null;
            ViewBag.Loan = null;
            return PartialView("NewEmployeeLoans", _model);
        }

        [HttpGet("GethistoriLoan")]
        public async Task<ActionResult> GethistoriLoan(string employeeid, int internalId)
        {
            GetdataUser();
            process = new ProcessEmployeeLoan(dataUser[0]);

            var list = await process.GetHistoryLoan(employeeid, internalId);
            ViewBag.Culture = dataUser[5];
            return PartialView("GethistoriLoan", list);
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_EmployeeLoan, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeLoan(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_EmployeeLoan, employeeid);

            return (Json(responseUI));
        }


    }
}
