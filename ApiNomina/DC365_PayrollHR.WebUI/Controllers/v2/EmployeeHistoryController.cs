/// <summary>
/// Controlador API para gestión de EmployeeHistory.
/// Endpoint base: api/v2/employeeshistories
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeHistories;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories;
using DC365_PayrollHR.Core.Domain.Consts;
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
    /// Controlador para gestion de EmployeeHistory.
    /// </summary>
    [Route("api/v2.0/employeehistories")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeHistoryController : ControllerBase
    {
        private readonly IQueryAllHandler<EmployeeHistoryResponse> _QueryHandler;
        private readonly IEmployeeHistoryCommandHandler _CommandHandler;

        public EmployeeHistoryController(IQueryAllHandler<EmployeeHistoryResponse> queryHandler, IEmployeeHistoryCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<EmployeeHistoryDeleteRequest> ids, string employeeid)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeHistoryUpdateRequest model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Ejecuta MarkIsForDGT de forma asincrona.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("markisfordgt")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, Edit = true)]
        public async Task<ActionResult> MarkIsForDGT([FromBody] EmployeeHistoryIsForDGTRequest model)
        {
            var objectresult = await _CommandHandler.MarkIsForDGT(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
