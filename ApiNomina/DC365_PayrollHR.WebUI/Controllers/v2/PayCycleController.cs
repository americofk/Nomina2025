/// <summary>
/// Controlador API para gestión de PayCycle.
/// Endpoint base: api/v2/paycycles
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.PayCycles;
using DC365_PayrollHR.Core.Application.StoreServices.PayCycles;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de PayCycle.
    /// </summary>
    [Route("api/v2.0/paycycle")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class PayCycleController : ControllerBase
    {
        private readonly IPayCycleCommandHandler _commandHandler;
        private readonly IQueryHandler<PayCycleResponse> _queryHandler;

        public PayCycleController(IPayCycleCommandHandler commandHandler, IQueryHandler<PayCycleResponse> queryHandler)
        {
            _commandHandler = commandHandler;
            _queryHandler = queryHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayCycle, View = true)]
        public async Task<ActionResult<Response<string>>> Get([FromQuery] PaginationFilter filter, [FromQuery] SearchFilter searchFilter, string payrollid)
        {
            var objectresult = await _queryHandler.GetAll(filter,searchFilter, payrollid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="createPayCycleCommand">Parametro createPayCycleCommand.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.PayCycle, Edit = true)]
        public async Task<ActionResult<Response<string>>> Post([FromQuery] PayCycleRequest createPayCycleCommand)
        {
            var objectresult= await _commandHandler.Create(createPayCycleCommand);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayCycle, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string payrollid)
        {
            var objectresult = await _commandHandler.DeleteByParent(ids, payrollid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Ejecuta MarkIsForTax de forma asincrona.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("markisfortax")]
        [AuthorizePrivilege(MenuId = MenuConst.PayCycle, Edit = true)]
        public async Task<ActionResult> MarkIsForTax([FromBody] PayCycleIsForTaxRequest model)
        {
            var objectresult = await _commandHandler.MarkIsForTax(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Ejecuta MarkIsForTss de forma asincrona.
        
        /// </summary>
        
        /// <param name="model">Parametro model.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpPost("markisfortss")]
        [AuthorizePrivilege(MenuId = MenuConst.PayCycle, Edit = true)]
        public async Task<ActionResult> MarkIsForTss([FromBody] PayCycleIsForTssRequest model)
        {
            var objectresult = await _commandHandler.MarkIsForTss(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
