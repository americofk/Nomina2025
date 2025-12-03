/// <summary>
/// Controlador API para gestión de TaxDetail.
/// Endpoint base: api/v2/taxdetails
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.TaxDetails;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.TaxDetails;
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
    /// Controlador para gestion de TaxDetail.
    /// </summary>
    [Route("api/v2.0/taxdetails")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class TaxDetailController : ControllerBase
    {
        private readonly IQueryHandler<TaxDetail> _QueryHandler;
        private readonly ITaxDetailCommandHandler _CommandHandler;

        public TaxDetailController(IQueryHandler<TaxDetail> queryHandler, ITaxDetailCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.TaxEnabled, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string id)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="taxid">Parametro taxid.</param>

        /// <param name="internalid">Parametro internalid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{taxid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.TaxEnabled, View = true)]
        public async Task<ActionResult> GetById(string taxid, int internalid)
        {
            var objectresult = await _QueryHandler.GetId(new string[]{taxid, internalid.ToString()});
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.TaxEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] TaxDetailRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="taxid">Parametro taxid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpDelete("{taxid}")]
        [AuthorizePrivilege(MenuId = MenuConst.TaxEnabled, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string taxid)
        {
            var objectresult = await _CommandHandler.DeleteByParent(ids, taxid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="internalid">Parametro internalid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.TaxEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] TaxDetailRequest model, int internalid)
        {
            var objectresult = await _CommandHandler.Update(internalid.ToString(), model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
