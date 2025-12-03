/// <summary>
/// Controlador API para gestión de User.
/// Endpoint base: api/users
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Users;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Users;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de User.
    /// </summary>
    [Route("api/users")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.LocalAdmin)]
    public class UserController : ControllerBase
    {
        private readonly IQueryHandler<UserResponse> _QueryHandler;
        private readonly IUserCommandHandler _CommandHandler;

        public UserController(IQueryHandler<UserResponse> queryHandler, IUserCommandHandler commandHandler)
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

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] UserRequestUpdate model)
        {            
            return Ok(await _CommandHandler.Update(id, model));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="request">Parametro request.</param>

        /// <param name="alias">Parametro alias.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("uploadimageuser/{alias}")]
        public async Task<ActionResult> PostImage([FromForm] UserImageRequest request, string alias)
        {
            return Ok(await _CommandHandler.UploadUserImage(request, alias));
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="alias">Parametro alias.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("downloadimageuser/{alias}")]
        public async Task<ActionResult> GetImage(string alias)
        {
            return Ok(await _CommandHandler.DownloadUserImage(alias));
        }
        
        
    }
}
