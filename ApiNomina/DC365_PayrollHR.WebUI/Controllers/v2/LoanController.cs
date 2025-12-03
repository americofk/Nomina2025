/// <summary>
/// Controlador API para gestión de Loan.
/// Endpoint base: api/v2/loans
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Loans;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Loans;
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
    /// Controlador para gestion de Loan.
    /// </summary>
    [Route("api/v2.0/loans")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class LoanController : ControllerBase
    {
        private readonly IQueryHandler<Loan> _QueryHandler;
        private readonly ILoanCommandHandler _CommandHandler;

        public LoanController(
            IQueryHandler<Loan> queryHandler,
            ILoanCommandHandler commandHandler)
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


        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="loanid">Parametro loanid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{loanid}")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, View = true)]
        public async Task<ActionResult> GetEnabledById(string loanid)
        {
            var objectresult = await _QueryHandler.GetId(loanid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] LoanRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Delete = true)]
        public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] LoanRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }



        /// <summary>



        /// Obtiene.



        /// </summary>



        /// <param name="paginationFilter">Parametro paginationFilter.</param>



        /// <param name="searchFilter">Parametro searchFilter.</param>



        /// <returns>Resultado de la operacion.</returns>



        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
