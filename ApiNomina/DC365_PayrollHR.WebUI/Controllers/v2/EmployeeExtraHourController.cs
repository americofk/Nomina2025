/// <summary>
/// Controlador API para gestión de EmployeeExtraHour.
/// Endpoint base: api/v2/employeesextrahours
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeExtraHours;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeExtraHours;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de EmployeeExtraHour.
    /// </summary>
    [Route("api/v2.0/employeeextrahours")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeExtraHourController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeExtraHourResponse> _QueryHandler;
        private readonly IEmployeeExtraHourCommandHandler _CommandHandler;

        public EmployeeExtraHourController(IQueryHandler<EmployeeExtraHourResponse> queryHandler, IEmployeeExtraHourCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeExtraHour, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="workedday">Parametro workedday.</param>

        /// <param name="earningcodeid">Parametro earningcodeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}/{earningcodeid}/{workedday}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeExtraHour, View = true)]
        public async Task<ActionResult> GetById(string employeeid, DateTime workedday, string earningcodeid)
        {
            var objectresult = await _QueryHandler.GetId(new string[] {employeeid, workedday.ToString(), earningcodeid });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeExtraHour, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeExtraHourRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeExtraHour, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<EmployeeExtraHourRequestDelete> ids, string employeeid)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeExtraHour, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeExtraHourRequestUpdate model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
