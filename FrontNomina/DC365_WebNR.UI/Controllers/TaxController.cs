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
    [Route("impuestos")]
    public class TaxController : ControllerBase
    {
        ProcessTax process;
        [HttpGet]
        public async Task<IActionResult> Taxs()
        {
            GetdataUser();
            process = new ProcessTax(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Tax>.GetPropertyToSearch();

            return View(model);
        }

        [HttpGet("ObtenerFormNuevo")]
        public async Task<IActionResult> NewAndEditTax([FromQuery] string taxid)
        {
            Tax model;
            GetdataUser();

            process = new ProcessTax(dataUser[0]);

            if (!string.IsNullOrEmpty(taxid))
            {
                //Editar
                model = await process.GetDataAsync(taxid);
            }
            else
            {
                //Nuevo
                model = new Tax();
            }

            ViewBag.Projects = await selectListsDropDownList(SelectListOptions.Project);
            ViewBag.ProjCategories = await selectListsDropDownList(SelectListOptions.ProjCategory);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);
            ViewBag.Currencies = await selectListsDropDownList(SelectListOptions.Currency);

            return PartialView("NewAndEditTax", model);
        }

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(Tax model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessTax(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(model.TaxId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }


        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Tax)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessTax(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Tax);

            return (Json(responseUI));
        }

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> listid_Tax)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessTax(dataUser[0]);
            foreach (var item in listid_Tax)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }


        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> TaxFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessTax(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("TaxFilterOrMoreData", model);
        }
    }
}
