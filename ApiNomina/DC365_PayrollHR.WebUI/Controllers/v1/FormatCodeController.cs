using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/regionalcodes")]
    [Authorize]
    [ApiController]
    public class FormatCodeController : ControllerBase
    {
        private readonly IQueryHandler<FormatCode> _QueryHandler;

        public FormatCodeController(IQueryHandler<FormatCode> queryHandler)
        {
            _QueryHandler = queryHandler;
        }


        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter));
        }
    }
}
