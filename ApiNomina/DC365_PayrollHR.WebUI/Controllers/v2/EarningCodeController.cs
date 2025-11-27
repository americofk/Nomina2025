/// <summary>
/// Controlador API para gestión de EarningCode.
/// Endpoint base: api/v2/earningcodes
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.StoreServices.EarningCodes;
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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de EarningCode.
    /// </summary>
    [Route("api/v2.0/earningcodes")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EarningCodeController : ControllerBase
    {
        private readonly IEarningCodeQueryHandler _queryHandler;
        private IEarningCodeCommandHandler _commandHandler;
        private IQueryAllHandler<EarningCodeVersion> _queryVersionHandler;

        public EarningCodeController(IEarningCodeQueryHandler queryHandler, IEarningCodeCommandHandler commandHandler, IQueryAllHandler<EarningCodeVersion> queryVersionHandler)
        {
            _queryHandler = queryHandler;
            _commandHandler = commandHandler;
            _queryVersionHandler = queryVersionHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="versions">Parametro versions.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, [FromQuery] bool versions = false, [FromQuery] string id = "")
        {
            if (!versions)
            {
                var objectresult = await _queryHandler.GetAll(paginationFilter,searchFilter, true);
                return StatusCode(objectresult.StatusHttp, objectresult);
            }
            else
            {
                var objectresult = await _queryVersionHandler.GetAll(paginationFilter,searchFilter, id); 
                return StatusCode(objectresult.StatusHttp, objectresult);
            }
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="paginationFilter">Parametro paginationFilter.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("enabled/hours")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> GetHours([FromQuery] PaginationFilter paginationFilter)
        {
            var objectresult = await _queryHandler.GetAllHours(paginationFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="paginationFilter">Parametro paginationFilter.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("enabled/earnings")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> GetEarnings([FromQuery] PaginationFilter paginationFilter)
        {
            var objectresult = await _queryHandler.GetAllEarnings(paginationFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            var objectresult = await _queryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="_model">Parametro _model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("enabled")]
        public async Task<ActionResult> Post([FromBody] EarningCodeRequest _model)
        {
            var objectresult = await _commandHandler.Create(_model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="id">Parametro id.</param>

        /// <param name="isVersion">Parametro isVersion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EarningCodeRequest model, string id, [FromQuery] bool isVersion = false)
        {
            var objectresult = await _commandHandler.Update(id, model, isVersion);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            var objectresult = await _commandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id)
        {
            var objectresult = await _commandHandler.UpdateStatus(id, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //Eliminar versiones
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="internalid">Parametro internalid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpDelete("version/{id}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Delete = true)]
        public async Task<ActionResult> Delete(string id, int internalid)
        {
            var objectresult = await _commandHandler.DeleteVersion(id, internalid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }





        /// <summary>





        /// Obtiene.





        /// </summary>





        /// <param name="paginationFilter">Parametro paginationFilter.</param>





        /// <param name="searchFilter">Parametro searchFilter.</param>





        /// <param name="versions">Parametro versions.</param>





        /// <param name="id">Parametro id.</param>





        /// <returns>Resultado de la operacion.</returns>





        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, [FromQuery] bool versions = false, [FromQuery] string id = "")
        {
            if (!versions)
            {
                var objectresult = await _queryHandler.GetAll(paginationFilter,searchFilter, false);
                return StatusCode(objectresult.StatusHttp, objectresult);
            }
            else
            {
                var objectresult = await _queryVersionHandler.GetAll(paginationFilter,searchFilter, id);
                return StatusCode(objectresult.StatusHttp, objectresult);
            }
        }

        //[HttpGet("enabled/{id}")]
        //[AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        //public async Task<ActionResult> GetById(string id)
        //{
        //    var objectresult = await _queryHandler.GetId(id);
        //    return StatusCode(objectresult.StatusHttp, objectresult);
        //}

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            var objectresult = await _commandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.LoanEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id)
        {
            var objectresult = await _commandHandler.UpdateStatus(id, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
