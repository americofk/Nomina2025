/// <summary>
/// Controlador API para gestión de EarningCode.
/// Endpoint base: api/earningcodes
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.StoreServices.EarningCodes;
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
    /// Controlador para gestion de EarningCode.
    /// </summary>
    [Route("api/earningcodes")]
    [ApiController]
    public class EarningCodeController : ControllerBase
    {
        private readonly IQueryHandler<EarningCode> _queryHandler;
        private IEarningCodeCommandHandler _commandHandler;

        public EarningCodeController(IQueryHandler<EarningCode> queryHandler, IEarningCodeCommandHandler commandHandler)
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
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
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
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _queryHandler.GetId(id));
        }

        // POST api/<EarningCodeController>
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EarningCodeRequest _model)
        {
            return Ok(await _commandHandler.Create(_model));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EarningCodeRequest model, string id)
        {
            return Ok(await _commandHandler.Update(id, model));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _commandHandler.Delete(ids));
        }
    }
}
