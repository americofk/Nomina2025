/// <summary>
/// Controlador para la gestión del calendario de días feriados.
/// Permite crear, editar, eliminar y listar días feriados de la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
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
    /// <summary>
    /// Controlador para gestion de CalendarHoliday.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("calendarholiday")]
    public class CalendarHolidayController : ControllerBase
    {
        ProcessCalendarHoliday process;
        /// <summary>
        /// Ejecuta CalendarHolidays de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Guarda los cambios.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <param name="operacion">Parametro operacion.</param>
        /// <returns>Resultado de la operacion.</returns>
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

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

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

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("editar")]
        public async Task<JsonResult> GetId(DateTime Id)
        {
            GetdataUser();
            CalendarHolidayResponse _model = new CalendarHolidayResponse();
            process = new ProcessCalendarHoliday(dataUser[0]);

            _model = await process.GetDataAsync(Id);

            return (Json(_model));
        }

        /// <summary>

        /// Ejecuta CalendarHolidayFilterOrMoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

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

        /// <summary>
        /// Endpoint AJAX para paginacion de dias feriados.
        /// </summary>
        [HttpGet("GetCalendarHolidaysPaged")]
        public async Task<JsonResult> GetCalendarHolidaysPaged(string searchValue = "", int pageNumber = 1, int pageSize = 20)
        {
            GetdataUser();
            process = new ProcessCalendarHoliday(dataUser[0]);

            string propertyName = "";
            if (!string.IsNullOrWhiteSpace(searchValue))
            {
                propertyName = "Description";
            }

            var pagedResult = await process.GetAllDataPagedAsync(propertyName, searchValue, pageNumber, pageSize);

            return Json(new
            {
                data = pagedResult.Data,
                pageNumber = pagedResult.PageNumber,
                pageSize = pagedResult.PageSize,
                totalRecords = pagedResult.TotalRecords,
                totalPages = pagedResult.TotalPages,
                hasPreviousPage = pagedResult.HasPreviousPage,
                hasNextPage = pagedResult.HasNextPage
            });
        }

    }
}
