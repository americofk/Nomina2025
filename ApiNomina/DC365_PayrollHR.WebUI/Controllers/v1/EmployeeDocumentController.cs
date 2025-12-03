/// <summary>
/// Controlador API para gestión de EmployeeDocument.
/// Endpoint base: api/employeesdocuments
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDocuments;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDocuments;
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
    /// Controlador para gestion de EmployeeDocument.
    /// </summary>
    [Route("api/employeedocuments")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    public class EmployeeDocumentController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeDocumentResponse> _QueryHandler;
        private readonly IEmployeeDocumentCommandHandler _CommandHandler;

        public EmployeeDocumentController(IQueryHandler<EmployeeDocumentResponse> queryHandler, IEmployeeDocumentCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalid">Parametro internalid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, View = true)]
        public async Task<ActionResult> GetById( string employeeid, int internalid)
        {
            return Ok(await _QueryHandler.GetId(new string[] { employeeid, internalid.ToString()}));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeDocumentRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            return Ok(await _CommandHandler.DeleteByEmployee(ids, employeeid));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="internalid">Parametro internalid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeDocumentRequest model, string internalid)
        {
            return Ok(await _CommandHandler.Update(internalid, model));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="request">Parametro request.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalid">Parametro internalid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("uploadimageuser/{employeeid}/{internalid}")]
        public async Task<ActionResult> PostDocument([FromForm] EmplDocFileRequest request, string employeeid, int internalid)
        {
            return Ok(await _CommandHandler.UploadDocument(request, employeeid, internalid));
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <param name="internalid">Parametro internalid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("downloadimageuser/{employeeid}/{internalid}")]
        public async Task<ActionResult> GetDocument(string employeeid, int internalid)
        {
            return Ok(await _CommandHandler.DownloadDocument(employeeid, internalid));
        }

        /// <summary>
        /// Elimina el archivo adjunto de un documento.
        /// </summary>
        /// <param name="employeeid">ID del empleado.</param>
        /// <param name="internalid">ID interno del documento.</param>
        /// <returns>Resultado de la operación.</returns>
        [HttpDelete("attachment/{employeeid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDocument, Edit = true)]
        public async Task<ActionResult> DeleteAttachment(string employeeid, int internalid)
        {
            return Ok(await _CommandHandler.DeleteAttachment(employeeid, internalid));
        }
    }

}
