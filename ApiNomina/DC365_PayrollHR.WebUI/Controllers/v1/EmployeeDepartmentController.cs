/// <summary>
/// Controlador API para gestión de EmployeeDepartment.
/// Endpoint base: api/employeesdepartments
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDepartments;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeparments;
using DC365_PayrollHR.Core.Domain.Consts;
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
    /// Controlador para gestion de EmployeeDepartment.
    /// </summary>
    [Route("api/employeedepartments")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    public class EmployeeDepartmentController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeDepartmentResponse> _QueryHandler;
        private readonly IEmployeeDepartmentCommandHandler _CommandHandler;

        public EmployeeDepartmentController(IQueryHandler<EmployeeDepartmentResponse> queryHandler, IEmployeeDepartmentCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeDepartmentRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            return Ok(await _CommandHandler.DeleteByParent(ids, employeeid));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeDepartmentRequest model, string employeeid)
        {
            return Ok(await _CommandHandler.Update(employeeid, model));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <param name="status">Parametro status.</param>


        /// <param name="departmentid">Parametro departmentid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("updatestatus/{employeeid}/{departmentid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Edit = true)]
        public async Task<ActionResult> UpdateStatus(string employeeid, bool status, string departmentid)
        {
            return Ok(await _CommandHandler.UpdateStatus(departmentid, status, employeeid));
        }
    }

}
