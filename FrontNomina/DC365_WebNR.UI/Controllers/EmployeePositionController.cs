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
    [Route("puestoempleados")]
    public class EmployeePositionController : ControllerBase
    {
        ProcessEmployeePosition process;
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeePosition(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            ViewBag.Culture = dataUser[5];

            return PartialView("ListEmployeePosition", list);
        }

        [HttpGet("FormNewEmployeePosition")]
        public async Task<ActionResult> EmployeeDepartment()
        {
            GetdataUser();
            EmployeePosition model = new EmployeePosition();
            ViewBag.Positions =  await selectListsDropDownList (SelectListOptions.Position);
            return PartialView("NewEmployeePosition", model);
        }

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeePosition model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeePosition(dataUser[0]);

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
            EmployeePosition _model = new EmployeePosition();
            process = new ProcessEmployeePosition(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId);
            ViewBag.Positions = null;
            return PartialView("NewEmployeePosition", _model);
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Position, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeePosition(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Position, employeeid);

            return (Json(responseUI));
        }

        //[HttpGet("Buscarcodigospuestos")]
        //public async Task<JsonResult> ListPosition()
        //{
        //    GetdataUser();
        //    ProcessPosition position = new ProcessPosition(dataUser[0]);
        //    var list = await position.GetAllDataAsync();
        //    return Json(list);
        //}
        
        
        [HttpPost("caducar")]
        public async Task<JsonResult> ExpirePosition(EmployeePositionStatusRequest model)
        {
            GetdataUser();
            process = new ProcessEmployeePosition(dataUser[0]);
            var responseUI = await process.UpdateStatus(model);
            return Json(responseUI);
        }
    }
}
