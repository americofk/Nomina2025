/// <summary>
/// Controlador API para gestión de UserCompany.
/// Endpoint base: api/v2/userscompanies
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Users;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Users;
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
    [Route("api/v2.0/users/options")]
    [Authorize]
    [ApiController]
    //[AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    /// <summary>
    /// Controlador para gestion de UserCompany.
    /// </summary>
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class UserCompanyController : ControllerBase
    {
        private readonly IUserCommandHandler _CommandHandler;

        public UserCompanyController(IUserCommandHandler commandHandler)
        {
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="companyid">Parametro companyid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("changecompany/{companyid}")]
        public async Task<ActionResult> GetNewCompany(string companyid)
        {
            var objectresult = await _CommandHandler.ChangeCompanyUsed(companyid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
