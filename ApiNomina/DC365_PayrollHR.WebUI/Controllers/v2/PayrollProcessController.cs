/// <summary>
/// Controlador API para gestión de PayrollProcess.
/// Endpoint base: api/v2/payrollsprocess
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.PayrollsProcess;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.PayrollsProcess;
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
    /// Controlador para gestion de PayrollProcess.
    /// </summary>
    [Route("api/v2.0/payrollprocess")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class PayrollProcessController : ControllerBase
    {
        private readonly IPayrollProcessQueryHandler _QueryHandler;
        private readonly IPayrollProcessCommandHandler _CommandHandler;

        public PayrollProcessController(IPayrollProcessQueryHandler queryHandler, IPayrollProcessCommandHandler commandHandler)
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

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //Definir endpoint para procesos de nómina por nómina
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="paginationFilter">Parametro paginationFilter.</param>
        /// <param name="payrollid">Parametro payrollid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("payroll/{payrollid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, View = true)]
        public async Task<ActionResult> GetByPayrollId([FromQuery] PaginationFilter paginationFilter, string payrollid)
        {
            var objectresult = await _QueryHandler.GetByParent(paginationFilter, payrollid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, View = true)]
        public async Task<ActionResult> GetEnabledId(string id)
        {
            var objectresult = await _QueryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> Post([FromBody] PayrollProcessRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
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


        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> Update([FromBody] PayrollProcessRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Procesa.
        
        /// </summary>
        
        /// <param name="processid">Parametro processid.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpPost("process/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> ProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.ProcessPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Ejecuta CalcProcessPayroll de forma asincrona.
        
        /// </summary>
        
        /// <param name="processid">Parametro processid.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpPost("calculate/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> CalcProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.CalcProcessPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Ejecuta PayProcessPayroll de forma asincrona.
        
        /// </summary>
        
        /// <param name="processid">Parametro processid.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpPost("pay/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> PayProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.PayPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Verifica si puede.

        /// </summary>

        /// <param name="processid">Parametro processid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("cancel/{processid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, Edit = true)]
        public async Task<ActionResult> CancelProcessPayroll(string processid)
        {
            var objectresult = await _CommandHandler.CancelPayroll(processid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
