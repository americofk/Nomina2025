/// <summary>
/// Manejador de comandos para operaciones CRUD de GeneralConfig.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.GeneralConfigs;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.GeneralConfigs
{
    /// <summary>
    /// Manejador para operaciones de IGeneralConfigCommand.
    /// </summary>
    public interface IGeneralConfigCommandHandler:
        ICreateCommandHandler<GeneralConfigRequest>
    {

    }

    /// <summary>

    /// Manejador para operaciones de GeneralConfigCommand.

    /// </summary>

    public class GeneralConfigCommandHandler : IGeneralConfigCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public GeneralConfigCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(GeneralConfigRequest model)
        {
            var response = await _dbContext.GeneralConfigs.FirstOrDefaultAsync();
            
            if(response == null)
            {
                var entity = BuildDtoHelper<GeneralConfig>.OnBuild(model, new GeneralConfig());

                _dbContext.GeneralConfigs.Add(entity);
                await _dbContext.SaveChangesAsync();

                return new Response<object>(entity)
                {
                    Message = "Registro creado correctamente"
                };
            }
            else
            {
                var entity = BuildDtoHelper<GeneralConfig>.OnBuild(model, response);

                await _dbContext.SaveChangesAsync();

                return new Response<object>(entity)
                {
                    Message = "Registro actualizado correctamente"
                };
            }
        }
    }
}
