/// <summary>
/// Controlador API para gestión de CourseEmployee.
/// Endpoint base: api/v2/coursesemployees
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseEmployees;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CourseEmployees;
using DC365_PayrollHR.Core.Domain.Consts;
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
    /// Controlador para gestion de CourseEmployee.
    /// </summary>
    [Route("api/v2.0/courseemployees")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class CourseEmployeeController : ControllerBase
    {
        private readonly IQueryHandler<CourseEmployeeResponse> _QueryHandler;
        private readonly ICourseEmployeeCommandHandler _CommandHandler;

        public CourseEmployeeController(IQueryHandler<CourseEmployeeResponse> queryHandler, ICourseEmployeeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="courseid">Parametro courseid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string courseid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, courseid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="courseid">Parametro courseid.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{courseid}/{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, View = true)]
        public async Task<ActionResult> GetById(string courseid, string employeeid)
        {
            var objectresult = await _QueryHandler.GetId(new string[]{ courseid, employeeid });
            return StatusCode(objectresult.StatusHttp, objectresult);
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
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
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
            var objectresult = await _CommandHandler.DeleteByCourseId(ids, courseid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="courseid">Parametro courseid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseInstructor, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CourseEmployeeRequest model, string courseid)
        {
            var objectresult = await _CommandHandler.Update(courseid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
