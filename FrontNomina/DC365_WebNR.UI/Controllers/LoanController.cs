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
    [Route("prestamos")]
    public class LoanController : ControllerBase
    {
        ProcessLoan process;

        [HttpGet]
        public async Task<IActionResult> Loans()
        {
            GetdataUser();
            process = new ProcessLoan(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Loan>.GetPropertyToSearch();
            return View(model);
        }

        [HttpGet("ObtenerFormNuevo")]
        public async Task<IActionResult> NewAndEditLoan([FromQuery] string loanid)
        {
            Loan model;
            GetdataUser();

            process = new ProcessLoan(dataUser[0]);

            if (!string.IsNullOrEmpty(loanid))
            {
                //Editar
                model = await process.GetDataAsync(loanid);
            }
            else
            {
                //Nuevo
                model = new Loan();
            }

            ViewBag.Projects = await selectListsDropDownList(SelectListOptions.Project);
            ViewBag.ProjCategory = await selectListsDropDownList(SelectListOptions.ProjCategory);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);

            return PartialView("NewAndEditLoan", model);
        }

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(Loan model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessLoan(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(model.LoanId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Loans)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessLoan(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Loans);

            return (Json(responseUI));
        }

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> listid_Loans)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessLoan(dataUser[0]);
            foreach (var item in listid_Loans)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> LoansFilter(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessLoan(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("LoansFilter", model);
        }
    }
}
