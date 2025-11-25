using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
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
    [Route("api/countries")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class CountryController : ControllerBase
    {
        private readonly IQueryAllWithoutSearchHandler<Country> _QueryHandler;

        public CountryController(IQueryAllWithoutSearchHandler<Country> queryHandler)
        {
            _QueryHandler = queryHandler;
        }

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, true));
        }
    }
}
