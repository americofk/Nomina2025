/// <summary>
/// Controlador API para gestión de CourseEmployee.
/// Endpoint base: api/coursesemployees
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseEmployees;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CourseEmployees;
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
    /// Controlador para gestion de CourseEmployee.
    /// </summary>
    [Route("api/courseemployees")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class CourseEmployeeController : ControllerBase
    {
        private readonly IQueryHandler<CourseEmployee> _QueryHandler;
        private readonly ICourseEmployeeCommandHandler _CommandHandler;

        public CourseEmployeeController(IQueryHandler<CourseEmployee> queryHandler, ICourseEmployeeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="courseid">Parametro courseid.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, string courseid, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, courseid));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CourseEmployeeRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="courseid">Parametro courseid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpDelete("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string courseid)
        {
            return Ok(await _CommandHandler.DeleteByCourseId(ids, courseid));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="courseid">Parametro courseid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CourseEmployeeRequest model, string courseid)
        {
            return Ok(await _CommandHandler.Update(courseid, model));
        }
    }

}
