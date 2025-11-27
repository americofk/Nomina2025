/// <summary>
/// Controlador API para gestión de PayCycle.
/// Endpoint base: api/paycycles
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.StoreServices.PayCycles;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de PayCycle.
    /// </summary>
    [Route("api/paycycle")]
    [ApiController]
    public class PayCycleController : ControllerBase
    {
        private readonly IPayCycleCommandHandler _commandHandler;
        private readonly IQueryHandler<PayCycle> _queryHandler;

        public PayCycleController(IPayCycleCommandHandler commandHandler, IQueryHandler<PayCycle> queryHandler)
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
        public async Task<ActionResult<Response<string>>> Get([FromQuery] PaginationFilter filter, [FromQuery] SearchFilter searchFilter, string payrollid)
        {
            return Ok(await _queryHandler.GetAll(filter,searchFilter, payrollid));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="createPayCycleCommand">Parametro createPayCycleCommand.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        public async Task<ActionResult<Response<string>>> Post([FromQuery] PayCycleRequest createPayCycleCommand)
        {
            return Ok(await _commandHandler.Create(createPayCycleCommand));
        }
    }
}
