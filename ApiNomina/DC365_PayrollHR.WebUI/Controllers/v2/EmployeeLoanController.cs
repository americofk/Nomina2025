/// <summary>
/// Controlador API para gestión de EmployeeLoan.
/// Endpoint base: api/v2/employeesloans
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeLoans;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeLoans;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
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
    /// Controlador para gestion de EmployeeLoan.
    /// </summary>
    [Route("api/v2.0/employeeloans")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeLoanController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeLoanResponse> _QueryHandler;
        private readonly IEmployeeLoanCommandHandler _CommandHandler;
        private readonly IQueryHandler<EmployeeLoanHistoryResponse> _queryHistoryHandler;

        public EmployeeLoanController(IQueryHandler<EmployeeLoanResponse> queryHandler, IEmployeeLoanCommandHandler commandHandler,
            IQueryHandler<EmployeeLoanHistoryResponse> queryHistoryHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
            _queryHistoryHandler = queryHistoryHandler;
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="paginationFilter">Parametro paginationFilter.</param>


        /// <param name="searchFilter">Parametro searchFilter.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeLoan, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter ,string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="paginationFilter">Parametro paginationFilter.</param>
        
        /// <param name="searchFilter">Parametro searchFilter.</param>
        
        /// <param name="parentinternalid">Parametro parentinternalid.</param>
        
        /// <param name="employeeid">Parametro employeeid.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("loanhistories/{employeeid}/{parentinternalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeLoan, View = true)]
        public async Task<ActionResult> GetHistory([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter ,int parentinternalid, string employeeid)
        {
            var objectresult = await _queryHistoryHandler.GetAll(paginationFilter, searchFilter, new string[] { parentinternalid.ToString(), employeeid });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalid">Parametro internalid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeLoan, View = true)]
        public async Task<ActionResult> GetById(string employeeid, int internalid)
        {
            var objectresult = await _QueryHandler.GetId(new string[] { employeeid, internalid.ToString() });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Crea o procesa.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeLoan, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeLoanRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeLoan, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeLoan, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeLoanRequestUpdate model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
