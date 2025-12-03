/// <summary>
/// Controlador API para gestión de CoursePosition.
/// Endpoint base: api/coursepositions
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.CoursePositions;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CoursePositons;
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
    /// Controlador para gestion de CoursePosition.
    /// </summary>
    [Route("api/coursepositions")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class CoursePositionController : ControllerBase
    {
        private readonly IQueryHandler<CoursePositionResponse> _QueryHandler;
        private readonly ICoursePositionCommandHandler _CommandHandler;

        public CoursePositionController(IQueryHandler<CoursePositionResponse> queryHandler, ICoursePositionCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.CoursePosition, View = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.CoursePosition, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CoursePositionRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.CoursePosition, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string courseid)
        {
            return Ok(await _CommandHandler.DeleteByCourseId(ids, courseid));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="id">Parametro id.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CoursePosition, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CoursePositionRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }
    }
}
