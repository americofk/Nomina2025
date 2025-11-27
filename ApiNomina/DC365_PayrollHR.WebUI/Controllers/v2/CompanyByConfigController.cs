/// <summary>
/// Controlador API para gestión de CompanyByConfig.
/// Endpoint base: api/v2/companybyconfig
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Companies;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Model.Companies;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de CompanyByConfig.
    /// </summary>
    [Route("api/v2.0/config/companies")]
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class CompanyByConfigController : ControllerBase
    {
        private readonly ICompanyQueryHandler _QueryHandler;
        private readonly ICompanyCommandHandler _CommandHandler;

        public CompanyByConfigController(ICompanyQueryHandler queryHandler, ICompanyCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Crea o procesa.
        
        /// </summary>
        
        /// <param name="model">Parametro model.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpPost]
        public async Task<ActionResult> Post(CompanyRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="companyid">Parametro companyid.</param>


        /// <param name="status">Parametro status.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("{companyid}")]
        public async Task<ActionResult> Update(string companyid, [FromQuery] bool status)
        {
            var objectresult = await _CommandHandler.UpdateStatus(companyid, status);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
