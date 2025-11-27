/// <summary>
/// Controlador API para gestión de DeductionCode.
/// Endpoint base: api/deductioncodes
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.StoreServices.DeductionCodes;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de DeductionCode.
    /// </summary>
    [Route("api/deductioncodes")]
    [ApiController]
    public class DeductionCodeController : ControllerBase
    {
        private readonly IQueryHandler<DeductionCode> _queryHandler;
        private readonly IDeductionCodeCommandHandler _commandHandler;

        public DeductionCodeController(IQueryHandler<DeductionCode> queryHandler,
           IDeductionCodeCommandHandler commandHandler)
        {
            _queryHandler = queryHandler;
            _commandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _queryHandler.GetAll(paginationFilter, searchFilter));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _queryHandler.GetId(id));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="_model">Parametro _model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, Edit = true)]
        public async Task<ActionResult<Response<object>>> Post([FromBody] DeductionCodeRequest _model)
        {
            return await _commandHandler.Create(_model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _commandHandler.Delete(ids));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] DeductionCodeRequest model, string id)
        {
            return Ok(await _commandHandler.Update(id, model));
        }
    }
}
