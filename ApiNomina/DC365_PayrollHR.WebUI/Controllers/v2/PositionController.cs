/// <summary>
/// Controlador API para gestión de Position.
/// Endpoint base: api/v2/positions
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Positions;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Positions;
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
    /// Controlador para gestion de Position.
    /// </summary>
    [Route("api/v2.0/positions")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class PositionController : ControllerBase
    {
        private readonly IQueryHandler<Position> _QueryHandler;
        private readonly IPositionCommandHandler _CommandHandler;

        public PositionController(IQueryHandler<Position> queryHandler, IPositionCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, new bool[] { true, false });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
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
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] PositionRequest model)
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
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Delete = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] PositionRequest model, string id)
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
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id)
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
        [AuthorizePrivilege(MenuId = MenuConst.PositionDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, new bool[] { false, false });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionDisabled, Delete = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.PositionDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }





        #region Vacants
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="paginationFilter">Parametro paginationFilter.</param>
        /// <param name="searchFilter">Parametro searchFilter.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("vacants")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, View = true)]
        public async Task<ActionResult> GetVacants([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, new bool[] { true, true });
            return StatusCode(objectresult.StatusHttp, objectresult);

        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="isVacants">Parametro isVacants.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("vacants/updatetovacants/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Edit = true)]
        public async Task<ActionResult> UpdateToVacant(string id, bool isVacants)
        {
            var objectresult = await _CommandHandler.UpdateVacants(id, isVacants);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("vacants")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Delete = true)]
        public async Task<ActionResult> DeleteVacants([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("vacants")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Edit = true)]
        public async Task<ActionResult> PostVacants([FromBody] PositionRequest model)
        {
            var objectresult = await _CommandHandler.Create(model, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("vacants/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Edit = true)]
        public async Task<ActionResult> UpdateVacant([FromBody] PositionRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        #endregion

    }

}
