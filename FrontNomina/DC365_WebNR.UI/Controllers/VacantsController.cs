using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("vacantes")]
    public class M_VacantsController : ControllerBase
    {
        ProcessVacants processVacants;

        [HttpGet]
        public async Task<IActionResult> Vacants()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processVacants = new ProcessVacants(dataUser[0]);
            var models = await processVacants.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Vacants>.GetPropertyToSearch();

            return View(models);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Vacants_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processVacants = new ProcessVacants(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processVacants.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Vacants_Filter_OrMore_Data", model);
        }

        [HttpPost("guardar")]
        public async Task<JsonResult> Save(Vacants Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processVacants = new ProcessVacants(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operacion)
                {
                    case "1":
                        responseUI = await processVacants.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processVacants.PutDataAsync(Obj.PositionId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        public async Task<JsonResult> delete(List<string> IdPositionVacants)
        {
            GetdataUser();
            ResponseUI responseUI;
            processVacants = new ProcessVacants(dataUser[0]);

            responseUI = await processVacants.DeleteDataAsync(IdPositionVacants);

            return (Json(responseUI));
        }

       
        [HttpPost("BuscarCargos")]
        public async Task<JsonResult> JobsDropDownList()
        {
            GetdataUser();
            ProcessJob processJob = new ProcessJob(dataUser[0]);
            var list = await processJob.GetAllDataAsync();
            return Json(list);
        }

        [HttpPost("BuscarPuestos")]
        public async Task<JsonResult> PositionDropDownList()
        {
            GetdataUser();
            ProcessPosition processPosition = new ProcessPosition(dataUser[0]);
            var list = await processPosition.GetAllDataAsync();
            return Json(list);
        }

        [HttpPost("actualizarestatus")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> updateStatus(List<string> PositionidVacant)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processVacants = new ProcessVacants(dataUser[0]);

            foreach (var item in PositionidVacant)
            {
                responseUI = await processVacants.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            Vacants _model = new Vacants();
            processVacants = new ProcessVacants(dataUser[0]);


            _model = await processVacants.GetIdDataAsync(Id);

            return (Json(_model));
        }

    }

}
