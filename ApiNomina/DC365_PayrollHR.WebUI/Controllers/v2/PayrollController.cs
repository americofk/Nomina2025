/// <summary>
/// Controlador API para gestión de Payroll.
/// Endpoint base: api/v2/payrolls
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Payrolls;
using DC365_PayrollHR.Core.Application.StoreServices.Payrolls;
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
    /// Controlador para gestion de Payroll.
    /// </summary>
    [Route("api/v2.0/payrolls")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class PayrollController : ControllerBase
    {
        private readonly IQueryHandler<PayrollResponse> QueryHandler;
        private readonly IPayrollCommandHandler CommandHandler;

        public PayrollController(IQueryHandler<PayrollResponse> _QueryHandler, IPayrollCommandHandler _CommandHandler)
        {
            QueryHandler = _QueryHandler;
            CommandHandler = _CommandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, View = true)]
        public async Task<ActionResult<PagedResponse<Payroll>>> Get([FromQuery] PaginationFilter filter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await QueryHandler.GetAll(filter,searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="includedetails">Parametro includedetails.</param>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, View = true)]
        public async Task<ActionResult<PagedResponse<Payroll>>> GetById([FromQuery] bool includedetails, string payrollid )
        {
            var objectresult = await QueryHandler.GetId(new string[] { payrollid, includedetails.ToString() });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="_model">Parametro _model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, Edit = true)]
        public async Task<ActionResult<Response<Payroll>>> Post([FromBody] PayrollRequest _model)
        {
            var objectresult = await CommandHandler.Create(_model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("enabled/{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, Edit = true)]
        public async Task<ActionResult> Update([FromBody] PayrollRequestUpdate model, string payrollid)
        {
            var objectresult = await CommandHandler.Update(payrollid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, Delete = true)]
        public async Task<ActionResult> Delete(List<string> ids)
        {
            var objectresult = await CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("enabled/updatestatus/{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string payrollid)
        {
            var objectresult = await CommandHandler.UpdateStatus(payrollid, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }




        /// <summary>




        /// Obtiene.




        /// </summary>




        /// <param name="paginationFilter">Parametro paginationFilter.</param>




        /// <param name="searchFilter">Parametro searchFilter.</param>




        /// <returns>Resultado de la operacion.</returns>




        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await QueryHandler.GetAll(paginationFilter,searchFilter, false);
            return StatusCode(objectresult.StatusHttp, objectresult);

        }

        //[HttpGet("enabled/{id}")]
        //[AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        //public async Task<ActionResult> GetById(string id)
        //{
        //    var objectresult = await _queryHandler.GetId(id);
        //    return StatusCode(objectresult.StatusHttp, objectresult);
        //}

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            var objectresult = await CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("disabled/updatestatus/{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.Payroll, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string payrollid)
        {
            var objectresult = await CommandHandler.UpdateStatus(payrollid, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
