/// <summary>
/// Controlador API para gestión de ReportConfig.
/// Endpoint base: api/v2/reportconfigs
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Reports;
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
    /// Controlador para gestion de ReportConfig.
    /// </summary>
    [Route("api/v2.0/reportconfig")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ReportConfigController : ControllerBase
    {
        private readonly IQueryAllHandler<ReportConfig> _QueryHandler;
        private readonly ICreateCommandHandler<ReportConfigRequest> _CommandHandler;

        public ReportConfigController(IQueryAllHandler<ReportConfig> QueryHandler, ICreateCommandHandler<ReportConfigRequest> CommandHandler)
        {
            _QueryHandler = QueryHandler;
            _CommandHandler = CommandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.ReportConfig, View = true)]
        public async Task<ActionResult<PagedResponse<ReportConfig>>> Get()
        {
            var objectresult = await _QueryHandler.GetAll(null, null);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="_model">Parametro _model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.ReportConfig, Edit = true)]
        public async Task<ActionResult<Response<Payroll>>> Post([FromBody] ReportConfigRequest _model)
        {
            var objectresult = await _CommandHandler.Create(_model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
