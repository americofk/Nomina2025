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
    [Route("detalleimpuestos")]
    public class TaxDetailController : ControllerBase
    {

        ProcessTaxDetail process;

        [HttpGet("{Taxid}")]
        public async Task<IActionResult> TaxDetails(string Taxid)
        {
            GetdataUser();
            process = new ProcessTaxDetail(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync(Taxid);
            return PartialView("TaxDetails", model);
        }

        [HttpGet("ObtenerFormNuevo")]
        public async Task<IActionResult> NewAndEditTaxDetail([FromQuery] string TaxDetailid)
        {
            TaxDetail model;
            GetdataUser();

            process = new ProcessTaxDetail(dataUser[0]);

            if (!string.IsNullOrEmpty(TaxDetailid))
            {
                //Editar
                model = await process.GetDataAsync(TaxDetailid);
            }
            else
            {
                //Nuevo
                model = new TaxDetail();
            }

            ViewBag.Projects = await selectListsDropDownList(SelectListOptions.Project);
            ViewBag.ProjCategory = await selectListsDropDownList(SelectListOptions.ProjCategory);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);

            return PartialView("NewAndEditTaxDetail", model);
        }

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(TaxDetail model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessTaxDetail(dataUser[0]);

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
        public async Task<JsonResult> Delete(List<string> TaxDetailid, string Taxid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessTaxDetail(dataUser[0]);

            responseUI = await process.DeleteDataAsync(TaxDetailid, Taxid);

            return (Json(responseUI));
        }


    }
}
