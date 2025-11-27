/// <summary>
/// Manejador de comandos para operaciones CRUD de CourseInstructor.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CourseInstructors;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseInstructors
{
    public interface ICourseInstructorCommandHandler :
        ICreateCommandHandler<CourseInstructorRequest>,
        IUpdateCommandHandler<CourseInstructorRequest>
    {
        public Task<Response<bool>> DeleteByCourseId(List<string> ids, string courseid);
    }

    /// <summary>

    /// Manejador para operaciones de CourseInstructorCommand.

    /// </summary>

    public class CourseInstructorCommandHandler : ICourseInstructorCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public CourseInstructorCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(CourseInstructorRequest model)
        {
            var course = _dbContext.Courses.Where(x => x.CourseId == model.CourseId).FirstOrDefaultAsync();
            if (await course == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { $"El curso asignado no existe - Id {model.CourseId}" },
                    StatusHttp = 404
                };
            }

            var instructor = _dbContext.Instructors.Where(x => x.InstructorId == model.InstructorId).FirstOrDefaultAsync();
            if (await instructor == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { $"El instructor asignado no existe - Id {model.InstructorId}" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<CourseInstructor>.OnBuild(model, new CourseInstructor());

            _dbContext.CourseInstructors.Add(entity);
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


        /// <param name="courseid">Parametro courseid.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<bool>> DeleteByCourseId(List<string> ids, string courseid)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.CourseInstructors.Where(x => x.InstructorId == item 
                                        && x.CourseId == courseid).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");

                    }

                    _dbContext.CourseInstructors.Remove(response);
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


        public async Task<Response<object>> Update(string id, CourseInstructorRequest model)
        {
            var response = await _dbContext.CourseInstructors.Where(x => x.CourseId == id && x.InstructorId == model.InstructorId).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<CourseInstructor>.OnBuild(model, response);
            _dbContext.CourseInstructors.Update(entity);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }

    }

}
