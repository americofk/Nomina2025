/// <summary>
/// Manejador de comandos para operaciones CRUD de ReportConfig.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Reports;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports
{
    /// <summary>
    /// Manejador para operaciones de ReportConfigCommand.
    /// </summary>
    public class ReportConfigCommandHandler :
        ICreateCommandHandler<ReportConfigRequest>
    {
        private readonly IApplicationDbContext _dbContext;

        public ReportConfigCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(ReportConfigRequest model)
        {
            var response = await _dbContext.ReportsConfig.FirstOrDefaultAsync();

            if (response == null)
            {
                var entity = BuildDtoHelper<ReportConfig>.OnBuild(model, new ReportConfig());

                _dbContext.ReportsConfig.Add(entity);
                await _dbContext.SaveChangesAsync();

                return new Response<object>(entity)
                {
                    Message = "Registro creado correctamente"
                };
            }
            else
            {
                var entity = BuildDtoHelper<ReportConfig>.OnBuild(model, response);

                await _dbContext.SaveChangesAsync();

                return new Response<object>(entity)
                {
                    Message = "Registro actualizado correctamente"
                };
            }
        }
    }
}
