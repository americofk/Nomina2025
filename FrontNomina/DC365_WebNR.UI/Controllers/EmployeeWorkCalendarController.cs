using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("horarioempleado")]
    public class EmployeeWorkCalendarController : ControllerBase
    {
        ProcessEmployeeWorkCalendar process;

        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            ViewBag.Culture = dataUser[5];

            return PartialView("ListEmployeeWorkCalendar", list);
        }

        [HttpGet("FormNewEmployeeWorkCalendar")]
        public async Task<ActionResult> EmployeeWorkCalendar()
        {
            GetdataUser();
            EmployeeWorkCalendar model = new EmployeeWorkCalendar();
            return PartialView("NewEmployeeWorkCalendar", model);
        }

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeWorkCalendar model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);

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

        //[HttpGet("{employeeid}/{internalId}")]
        [HttpGet("ListCalendar")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeWorkCalendar _model = new EmployeeWorkCalendar();
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);
            _model = await process.GetDataAsync(employeeid, internalId.ToString());

            return PartialView("NewEmployeeWorkCalendar", _model);
        }

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<EmployeeWorkCalendarDeleteRequest> model, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);

            responseUI = await process.DeleteDataAsync(model, employeeid);

            return (Json(responseUI));
        }

    }
}
