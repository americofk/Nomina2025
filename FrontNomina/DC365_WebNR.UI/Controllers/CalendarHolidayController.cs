using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Differencing;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("calendarholiday")]
    public class CalendarHolidayController : ControllerBase
    {
        ProcessCalendarHoliday process;
        [HttpGet]
        public async Task<IActionResult> CalendarHolidays()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessCalendarHoliday(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<CalendarHolidayResponse>.GetPropertyToSearch();

            return View(model);
        }
        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> save(CalendarHolidayResponse Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessCalendarHoliday(dataUser[0]);

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
                        responseUI = await process.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(Obj.CalendarDate, Obj);
                        break;

                }


            }

            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<CalendarHolidayResponse> model)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessCalendarHoliday(dataUser[0]);

            responseUI = await process.DeleteDataAsync(model);

            return (Json(responseUI));
        }

        [HttpGet("editar")]
        public async Task<JsonResult> GetId(DateTime Id)
        {
            GetdataUser();
            CalendarHolidayResponse _model = new CalendarHolidayResponse();
            process = new ProcessCalendarHoliday(dataUser[0]);

            _model = await process.GetDataAsync(Id);

            return (Json(_model));
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> CalendarHolidayFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessCalendarHoliday(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("CalendarHolidayFilterOrMoreData", model);
        }

    }
}
