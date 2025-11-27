/// <summary>
/// Controlador API para gestión de Payroll.
/// Endpoint base: api/payrolls
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Payrolls;
using DC365_PayrollHR.Core.Application.StoreServices.Payrolls;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de Payroll.
    /// </summary>
    [Route("api/payrolls")]
    [ApiController]
    public class PayrollController : ControllerBase
    {
        private readonly IQueryHandler<Payroll> QueryHandler;
        private readonly IPayrollCommandHandler CommandHandler;

        public PayrollController(IQueryHandler<Payroll> _QueryHandler, IPayrollCommandHandler _CommandHandler)
        {
            QueryHandler = _QueryHandler;
            CommandHandler = _CommandHandler;
        }

        // GET: api/<PayrollController>
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="filter">Parametro filter.</param>
        /// <param name="searchFilter">Parametro searchFilter.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<ActionResult<PagedResponse<Payroll>>> Get([FromQuery] PaginationFilter filter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await QueryHandler.GetAll(filter, searchFilter));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{payrollid}")]
        public async Task<ActionResult<PagedResponse<Payroll>>> GetById(string payrollid)
        {
            return Ok(await QueryHandler.GetId(payrollid));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="_model">Parametro _model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        public async Task<ActionResult<Response<string>>> Post([FromBody] PayrollRequest _model)
        {
            return Ok(await CommandHandler.Create(_model));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="payrollid">Parametro payrollid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{payrollid}")]
        public async Task<ActionResult> Update([FromBody] PayrollRequestUpdate model, string payrollid)
        {
            return Ok(await CommandHandler.Update(payrollid, model));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete]
        public async Task<ActionResult> Delete(List<string> ids)
        {
            return Ok(await CommandHandler.Delete(ids));
        }
    }
}
