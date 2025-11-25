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

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] UserRequestUpdate model)
        {            
            return Ok(await _CommandHandler.Update(id, model));
        }

        [HttpDelete]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        [HttpPost("uploadimageuser/{alias}")]
        public async Task<ActionResult> PostImage([FromForm] UserImageRequest request, string alias)
        {
            return Ok(await _CommandHandler.UploadUserImage(request, alias));
        }


        [HttpGet("downloadimageuser/{alias}")]
        public async Task<ActionResult> GetImage(string alias)
        {
            return Ok(await _CommandHandler.DownloadUserImage(alias));
        }
        
        
    }
}
