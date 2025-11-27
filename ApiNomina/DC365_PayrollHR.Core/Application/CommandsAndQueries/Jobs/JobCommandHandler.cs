/// <summary>
/// Manejador de comandos para operaciones CRUD de Job.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Jobs;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Jobs
{
    public interface IJobCommandHandler :
        ICreateCommandHandler<JobRequest>,
        IDeleteCommandHandler,
        IUpdateCommandHandler<JobRequest>
    {
        public Task<Response<object>> UpdateStatus(string id, bool status);
    }

    /// <summary>

    /// Manejador para operaciones de JobCommand.

    /// </summary>

    public class JobCommandHandler : IJobCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public JobCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }


        /// <summary>


        /// Crea un nuevo registro.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<object>> Create(JobRequest model)
        {
            var entity = BuildDtoHelper<Job>.OnBuild(model, new Job());

            _dbContext.Jobs.Add(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
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
                    var response = await _dbContext.Jobs.Where(x => x.JobId == item).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");
                    }

                    var position = await _dbContext.Positions.Where(x => x.JobId == item)
                        .Select(x => x.PositionId).FirstOrDefaultAsync();

                    if (!string.IsNullOrEmpty(position))
                    {
                        throw new Exception($"El registro seleccionado no se puede eliminar porque está asociado a un puesto - id {item}");
                    }

                    _dbContext.Jobs.Remove(response);
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


        public async Task<Response<object>> Update(string id, JobRequest model)
        {
            var response = await _dbContext.Jobs.Where(x => x.JobId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<Job>.OnBuild(model, response);
            _dbContext.Jobs.Update(entity);
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
            var response = await _dbContext.Jobs.Where(x => x.JobId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Message = "El registro seleccionado no existe"
                };
            }

            response.JobStatus = status;
            _dbContext.Jobs.Update(response);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }

}
