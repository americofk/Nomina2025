/// <summary>
/// Controlador API para gestión de SeveranceProcess.
/// Endpoint base: api/v2/severanceprocess
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.SeveranceProcesses;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.SeveranceProcess;
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


namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de SeveranceProcess.
    /// </summary>
    [Route("api/v2.0/severanceprocess")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class SeveranceProcessController : ControllerBase
    {
        private readonly IQueryHandler<SeveranceProcess> _QueryHandler;
        private readonly ISeveranceProcessCommandHandler _CommandHandler;

        public SeveranceProcessController(IQueryHandler<SeveranceProcess> queryHandler, ISeveranceProcessCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, View = true)]
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
        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Edit = true)]
        public async Task<ActionResult> Post([FromBody] SeveranceProcessRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Delete = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Edit = true)]
        public async Task<ActionResult> Update([FromBody] SeveranceProcessRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Actualiza el estado.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="status">Parametro status.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id, int status)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, status);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Agrega un empleado al proceso de prestaciones.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPost("enabled/{processId}/employees/{employeeId}")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Edit = true)]
        public async Task<ActionResult> AddEmployee(string processId, string employeeId)
        {
            var objectresult = await _CommandHandler.AddEmployee(processId, employeeId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Obtiene el detalle de un empleado en el proceso.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Detalle del empleado.</returns>
        [HttpGet("enabled/{processId}/employees/{employeeId}")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, View = true)]
        public async Task<ActionResult> GetDetail(string processId, string employeeId)
        {
            var objectresult = await _CommandHandler.GetDetail(processId, employeeId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Actualiza el detalle de un empleado en el proceso.
        /// </summary>
        /// <param name="model">Modelo con los datos actualizados.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPut("enabled/detail")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Edit = true)]
        public async Task<ActionResult> UpdateDetail([FromBody] SeveranceProcessDetail model)
        {
            var objectresult = await _CommandHandler.UpdateDetail(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Elimina un empleado del proceso de prestaciones.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpDelete("enabled/{processId}/employees/{employeeId}")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Delete = true)]
        public async Task<ActionResult> DeleteEmployee(string processId, string employeeId)
        {
            var objectresult = await _CommandHandler.DeleteEmployee(processId, employeeId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Calcula las prestaciones laborales de un empleado.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado del cálculo con todos los montos.</returns>
        [HttpPost("enabled/{processId}/employees/{employeeId}/calculate")]
        [AuthorizePrivilege(MenuId = MenuConst.SeveranceProcess, Edit = true)]
        public async Task<ActionResult> CalculateSeverance(string processId, string employeeId)
        {
            var objectresult = await _CommandHandler.CalculateSeverance(processId, employeeId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
