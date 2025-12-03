/// <summary>
/// Controlador API para gestión de ProjCategory.
/// Endpoint base: api/v2/projcategories
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.ProjCategories;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.ProjCategories;
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
    /// Controlador para gestion de ProjCategory.
    /// </summary>
    [Route("api/v2.0/projcategories")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ProjCategoryController : ControllerBase
    {
        private readonly IQueryHandler<ProjCategory> _QueryHandler;
        private readonly IProjCategoryCommandHandler _CommandHandler;

        public ProjCategoryController(IQueryHandler<ProjCategory> queryHandler, IProjCategoryCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //[HttpGet("projcategorys/disabled")]
        //[AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, View = true)]
        //public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter)
        //{
        //    var objectresult = await _QueryHandler.GetAll(paginationFilter, false);
        //    return StatusCode(objectresult.StatusHttp, objectresult);

        //}

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="projcategoryid">Parametro projcategoryid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{projcategoryid}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, View = true)]
        public async Task<ActionResult> GetById(string projcategoryid)
        {
            var objectresult = await _QueryHandler.GetId(projcategoryid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Crea o procesa.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] ProjCategoryRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Delete = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] ProjCategoryRequestUpdate model, string id)
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, Edit = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, View = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, Delete = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Obtiene las categorías de proyecto filtradas por proyecto.
        /// </summary>
        /// <param name="projId">Identificador del proyecto.</param>
        /// <returns>Lista de categorías del proyecto.</returns>
        [HttpGet("byproject/{projId}")]
        [AuthorizePrivilege(MenuId = MenuConst.ProjCategoryEnabled, View = true)]
        public async Task<ActionResult> GetByProject(string projId)
        {
            var objectresult = await _CommandHandler.GetByProject(projId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
