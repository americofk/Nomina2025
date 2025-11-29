/// <summary>
/// Manejador de comandos para operaciones CRUD de Position.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Positions;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Positions
{
    public interface IPositionCommandHandler :
        IDeleteCommandHandler,
        IUpdateCommandHandler<PositionRequest>
    {
        public Task<Response<object>> UpdateStatus(string id, bool status);
        public Task<Response<object>> UpdateVacants(string id, bool status);
        public Task<Response<object>> Create(PositionRequest model, bool isVacant = false);
    }

    /// <summary>

    /// Manejador para operaciones de PositionCommand.

    /// </summary>

    public class PositionCommandHandler : IPositionCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public PositionCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="isVacant">Parametro isVacant.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(PositionRequest model, bool isVacant)
        {
            var a = await ValidatPositionInformation(model);
            if (a != null)
                return a;

            var entity = BuildDtoHelper<Position>.OnBuild(model, new Position());
            entity.IsVacant = isVacant;
            _dbContext.Positions.Add(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
        }

        private async Task<Response<object>> ValidatPositionInformation(PositionRequest model)
        {
            if (!string.IsNullOrEmpty(model.NotifyPositionId))
            {
                var notifyPosition = _dbContext.Positions.Where(x => x.PositionId == model.NotifyPositionId).FirstOrDefaultAsync();

                if (await notifyPosition == null)
                {
                    return new Response<object>(false)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { "El puesto a notificar seleccionado no existe" },
                        StatusHttp = 404
                    };
                }
            }

            var department = _dbContext.Departments.Where(x => x.DepartmentId == model.DepartmentId).FirstOrDefaultAsync();

            if (await department == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El departamento seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var job = _dbContext.Jobs.Where(x => x.JobId == model.JobId).FirstOrDefaultAsync();

            if (await job == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El cargo seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            return null;
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<bool>> Delete(List<string> ids)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.Positions.Where(x => x.PositionId == item).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");

                    }

                    _dbContext.Positions.Remove(response);
                    await _dbContext.SaveChangesAsync();
                }
                transaction.Commit();
                return new Response<bool>(true) { Message = "Registros elimandos con éxito" };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return new Response<bool>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <param name="model">Parametro model.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<object>> Update(string id, PositionRequest model)
        {
            var response = await _dbContext.Positions.Where(x => x.PositionId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<Position>.OnBuild(model, response);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <param name="status">Parametro status.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<object>> UpdateStatus(string id, bool status)
        {
            var response = await _dbContext.Positions.Where(x => x.PositionId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Message = "El registro seleccionado no existe"
                };
            }

            response.PositionStatus = status;
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="isVacants">Parametro isVacants.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> UpdateVacants(string id, bool isVacants)
        {
            var response = await _dbContext.Positions.Where(x => x.PositionId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Message = "El registro seleccionado no existe"
                };
            }

            response.IsVacant = isVacants;
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }

}
