/// <summary>
/// Controlador API para gestión de Employee.
/// Endpoint base: api/employees
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Employees;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Employees;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de Employee.
    /// </summary>
    [Route("api/employees")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    public class EmployeeController : ControllerBase
    {
        private readonly IQueryHandler<Employee> _QueryHandler;
        private readonly IEmployeeCommandHandler _CommandHandler;

        public EmployeeController(IQueryHandler<Employee> queryHandler, IEmployeeCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, true));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, false));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, View = true)]
        public async Task<ActionResult> GetIdEnabled(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Delete = true)]
        public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="id">Parametro id.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <param name="status">Parametro status.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status, false));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="status">Parametro status.</param>

        /// <param name="isforDgt">Parametro isforDgt.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id, bool status, bool isforDgt)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status, isforDgt));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="request">Parametro request.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("uploadimage/{id}")]
        public async Task<ActionResult> PostImage([FromForm] EmployeeImageRequest request, string id)
        {
            return Ok(await _CommandHandler.UploadImage(request, id));
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("downloadimage/{id}")]
        public async Task<ActionResult> GetImage(string id)
        {
            return Ok(await _CommandHandler.DownloadImage(id));
        }
    }

}
