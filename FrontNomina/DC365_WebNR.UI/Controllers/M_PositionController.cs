using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
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
    [Route("puestosactivos")]
    public class M_PositionController : ControllerBase
    {
        ProcessPosition processPosition;

        [HttpGet]
        public async Task<IActionResult> Positions()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processPosition = new ProcessPosition(dataUser[0]);
            var model = await processPosition.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Position>.GetPropertyToSearch();


            //List<SelectListItem> SelectListPosition = new List<SelectListItem>();
            //SelectListPosition.Add(new SelectListItem
            //{
            //    Value = "",
            //    Text = "Seleccione"
            //});
            //foreach (var item in model)
            //{
            //    SelectListPosition.Add(new SelectListItem
            //    {
            //        Value = item.PositionId,
            //        Text = item.PositionName
            //    });
            //}


            var positionVacant = await selectListsDropDownList(SelectListOptions.PositionVacant);
            var position = await selectListsDropDownList(SelectListOptions.Position);
            var PositionAll = position.Concat(positionVacant).ToList();
            ViewBag.SelectListPosition = PositionAll;
            ViewBag.Department = await selectListsDropDownList(SelectListOptions.Department);
            ViewBag.Job = await selectListsDropDownList(SelectListOptions.Job);

            return View(model);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Positions_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processPosition = new ProcessPosition(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processPosition.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Positions_Filter_OrMore_Data", model);
        }

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(Position Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processPosition = new ProcessPosition(dataUser[0]);

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
                        responseUI = await processPosition.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processPosition.PutDataAsync(Obj.PositionId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> IdPosition)
        {
            GetdataUser();
            ResponseUI responseUI;
            processPosition = new ProcessPosition(dataUser[0]);

            responseUI = await processPosition.DeleteDataAsync(IdPosition);

            return (Json(responseUI));
        }

        [HttpGet("Buscarcargos")]
        public async Task<JsonResult> Listcargos()
        {
            GetdataUser();
            ProcessJob processJob = new ProcessJob(dataUser[0]);
            var list = await processJob.GetAllDataAsync();
            return Json(list);
        }

        [HttpPost("actualizarestatus")]
        public async Task<JsonResult> updateStatus(List<string> PositionIdpos)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processPosition = new ProcessPosition(dataUser[0]);

            foreach (var item in PositionIdpos)
            {
                responseUI = await processPosition.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            Position _model = new Position();
            processPosition = new ProcessPosition(dataUser[0]);

            _model = await processPosition.GetIdDataAsync(Id);

            return (Json(_model));
        }

        [HttpPost("marcarpuestovacante")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Isvacant(List<string> PositionIdIsVacant)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processPosition = new ProcessPosition(dataUser[0]);

            foreach (var item in PositionIdIsVacant)
            {
                responseUI = await processPosition.IspositionVacant(item);

            }

            return (Json(responseUI));
        }



    }
}
