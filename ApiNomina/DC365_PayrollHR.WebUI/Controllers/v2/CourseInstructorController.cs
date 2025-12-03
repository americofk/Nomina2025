/// <summary>
/// Controlador API para gestión de CourseInstructor.
/// Endpoint base: api/v2/coursesinstructors
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseInstructors;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CourseInstructors;
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
    /// Controlador para gestion de CourseInstructor.
    /// </summary>
    [Route("api/v2.0/courseinstructors")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class CourseInstructorController : ControllerBase
    {
        private readonly IQueryHandler<CourseInstructorResponse> _QueryHandler;
        private readonly ICourseInstructorCommandHandler _CommandHandler;

        public CourseInstructorController(IQueryHandler<CourseInstructorResponse> queryHandler, ICourseInstructorCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.CourseInstructor, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string courseid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, courseid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="courseid">Parametro courseid.</param>

        /// <param name="instructorid">Parametro instructorid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{courseid}/{instructorid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, View = true)]
        public async Task<ActionResult> GetById(string courseid, string instructorid)
        {
            var objectresult = await _QueryHandler.GetId(new string[] { courseid, instructorid });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.CourseInstructor, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CourseInstructorRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.CourseInstructor, Delete = true)]
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
        public async Task<ActionResult> Update([FromBody] CourseInstructorRequest model, string courseid)
        {
            var objectresult = await _CommandHandler.Update(courseid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
