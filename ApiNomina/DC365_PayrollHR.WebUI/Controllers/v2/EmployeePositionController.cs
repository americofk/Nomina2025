/// <summary>
/// Controlador API para gestión de EmployeePosition.
/// Endpoint base: api/v2/employeespositions
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeePositions;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions;
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
    /// Controlador para gestion de EmployeePosition.
    /// </summary>
    [Route("api/v2.0/employeepositions")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeePositionController : ControllerBase
    {
        private readonly IQueryHandler<EmployeePositionResponse> _QueryHandler;
        private readonly IEmployeePositionCommandHandler _CommandHandler;

        public EmployeePositionController(IQueryHandler<EmployeePositionResponse> queryHandler, IEmployeePositionCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);

        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="positionid">Parametro positionid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}/{positionid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, View = true)]
        public async Task<ActionResult> GetById(string employeeid, string positionid)
        {
            var objectresult = await _QueryHandler.GetId(new string[] { employeeid, positionid });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeePositionRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            var objectresult = await _CommandHandler.DeleteByParent(ids, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeePositionRequestUpdate model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("updatestatus")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Edit = true)]
        public async Task<ActionResult> UpdateStatus(EmployeePositionStatusRequest model)
        {
            var objectresult = await _CommandHandler.UpdateStatus(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
