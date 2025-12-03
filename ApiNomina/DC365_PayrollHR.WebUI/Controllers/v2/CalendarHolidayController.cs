/// <summary>
/// Controlador API para gestión de CalendarHoliday.
/// Endpoint base: api/v2/calendarholidays
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.CalendarHolidays;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CalendarHolidays;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de CalendarHoliday.
    /// </summary>
    [Route("api/v2.0/calendarholidays")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class CalendarHolidayController : ControllerBase
    {
        private readonly IQueryAllHandler<CalendarHoliday> _QueryHandler;
        private readonly ICalendarHolidayCommandHandler _CommandHandler;

        public CalendarHolidayController(IQueryAllHandler<CalendarHoliday> queryHandler, ICalendarHolidayCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.CalendarHoliday, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.CalendarHoliday, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CalendarHolidayRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.CalendarHoliday, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<CalendarHolidayDeleteRequest> ids)
        {
            var objectresult = await _CommandHandler.DeleteByParent(ids,"");
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.CalendarHoliday, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CalendarHolidayRequest model)
        {
            var objectresult = await _CommandHandler.Update("", model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
