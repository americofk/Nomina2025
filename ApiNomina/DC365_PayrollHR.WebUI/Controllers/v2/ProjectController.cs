/// <summary>
/// Controlador API para gestión de Project.
/// Endpoint base: api/v2/projects
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Projects;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Projects;
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
    /// Controlador para gestion de Project.
    /// </summary>
    [Route("api/v2.0/projects")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ProjectController : ControllerBase
    {
        private readonly IQueryHandler<Project> _QueryHandler;
        private readonly IProjectCommandHandler _CommandHandler;

        public ProjectController(IQueryHandler<Project> queryHandler, IProjectCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjectEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="projid">Parametro projid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{projid}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjectEnabled, View = true)]
        public async Task<ActionResult> GetById(string projid)
        {
            var objectresult = await _QueryHandler.GetId(projid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //[HttpGet("projects/disabled")]
        //[AuthorizePrivilege(MenuId = MenuConst.ProjectDisabled, View = true)]
        //public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter)
        //{
        //    var objectresult = await _QueryHandler.GetAll(paginationFilter, false);
        //    return StatusCode(objectresult.StatusHttp, objectresult);

        //}

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjectEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] ProjectRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjectEnabled, Delete = true)]
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


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjectEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] ProjectRequestUpdate model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjectEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatus(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }




        /// <summary>




        /// Obtiene.




        /// </summary>




        /// <param name="paginationFilter">Parametro paginationFilter.</param>




        /// <param name="searchFilter">Parametro searchFilter.</param>




        /// <returns>Resultado de la operacion.</returns>




        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjectDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjectDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjectDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
