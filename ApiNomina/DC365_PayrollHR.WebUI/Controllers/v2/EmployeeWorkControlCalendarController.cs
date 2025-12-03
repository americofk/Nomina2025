/// <summary>
/// Controlador API para gestión de EmployeeWorkControlCalendar.
/// Endpoint base: api/v2/employeesworkcontrolcalendars
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeWorkControlCalendars;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkControlCalendars;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de EmployeeWorkControlCalendar.
    /// </summary>
    [Route("api/v2.0/employeeworkcontrolcalendars")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeWorkControlCalendarController : ControllerBase
    {
        private readonly IEmployeeWorkControlCalendarCommandHandler _CommandHandler;
        private readonly IQueryHandler<EmployeeWorkControlCalendarResponse> _QueryHandler;

        public EmployeeWorkControlCalendarController(IEmployeeWorkControlCalendarCommandHandler commandHandler, IQueryHandler<EmployeeWorkControlCalendarResponse> queryHandler)
        {
            _CommandHandler = commandHandler;
            _QueryHandler = queryHandler;
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="paginationFilter">Parametro paginationFilter.</param>


        /// <param name="searchFilter">Parametro searchFilter.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeWorkCalendar, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <param name="workedday">Parametro workedday.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeWorkCalendar, View = true)]
        public async Task<ActionResult> GetById([FromQuery] string employeeid, [FromQuery] int workedday)
        {
            var objectresult = await _QueryHandler.GetId(new string[] { employeeid, workedday.ToString() });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Crea o procesa.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeWorkCalendar, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeWorkControlCalendarRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeWorkCalendar, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<EmployeeWorkControlCalendarDeleteRequest> ids, string employeeid)
        {
            var objectresult = await _CommandHandler.DeleteByParent(ids, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeWorkCalendar, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeWorkControlCalendarRequest model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

    }
}
