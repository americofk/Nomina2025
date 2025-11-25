using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cuentasbancoempleados")]
    public class EmployeeBankAccountController : ControllerBase
    {
        ProcessEmployeeBankAccount process;

        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeBankAccount(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            return PartialView("ListEmployeeBankAccount", list);
        }

        [HttpGet("FormNuevoBankAccount")]
        public async Task<ActionResult> NewBankAccountInfoEmployee()
        {
            GetdataUser();
            EmployeeBankAccount model = new EmployeeBankAccount();

            ViewBag.Currencies = await selectListsDropDownList(SelectListOptions.Currency);
   
            return PartialView("NewBankAccountEmployee", model);
        }

        [HttpPost("guardar")]
        public async Task<JsonResult> Save(EmployeeBankAccount model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeBankAccount(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(model.InternalId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }

        [HttpGet("{employeeid}/{internalId}")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeBankAccount _model = new EmployeeBankAccount();
            process = new ProcessEmployeeBankAccount(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId);

            ViewBag.Currencies = await selectListsDropDownList(SelectListOptions.Currency);

            return PartialView("NewBankAccountEmployee", _model);
        }

        [HttpPost("eliminar")]
        public async Task<JsonResult> Delete(List<string> listid_bankaccount, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeBankAccount(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_bankaccount, employeeid);

            return (Json(responseUI));
        }

        [HttpGet("ayuda")]
        public ActionResult Help()
        {
            return PartialView("Help");
        }

        [HttpGet("imagenayuda/{id}")]
        public ActionResult ImageHelp(string id)
        {
            return PartialView("ImageHelp", id);
        }


    }
}
