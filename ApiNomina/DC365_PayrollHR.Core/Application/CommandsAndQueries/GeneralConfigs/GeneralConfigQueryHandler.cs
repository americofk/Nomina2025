/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de GeneralConfig.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.GeneralConfigs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.GeneralConfigs
{
    /// <summary>
    /// Manejador para operaciones de GeneralConfigQuery.
    /// </summary>
    public class GeneralConfigQueryHandler : IQueryByIdHandler<GeneralConfigResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public GeneralConfigQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<GeneralConfigResponse>> GetId(string id)
        {
            var response = await _dbContext.GeneralConfigs
                .Select(x => new GeneralConfigResponse(){
                    SMTP = x.SMTP,
                    SMTPPort = x.SMTPPort,
                    IsPassword = string.IsNullOrEmpty(x.EmailPassword) ? false : true,
                    Email = x.Email
                })
                .FirstOrDefaultAsync();

            return new Response<GeneralConfigResponse>(response);
        }
    }
}
