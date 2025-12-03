/// <summary>
/// Manejador de comandos para operaciones CRUD de Course.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Course;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Courses
{
    public interface ICourseCommandHandler :
        ICreateCommandHandler<CourseRequest>,
        IDeleteCommandHandler,
        IUpdateCommandHandler<CourseRequest>
    {

    }

    /// <summary>

    /// Manejador para operaciones de CourseCommand.

    /// </summary>

    public class CourseCommandHandler : ICourseCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public CourseCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(CourseRequest model)
        {
            if(!string.IsNullOrEmpty(model.CourseParentId))
            {
                var courseParentId =  _dbContext.Courses.Where(x => x.CourseId == model.CourseParentId).FirstOrDefaultAsync();

                if(await courseParentId == null)
                {
                    return new Response<object>(false)
                    {
                        Succeeded = false,
                        Errors = new List<string>() { "El curso padre seleccionado no existe" },
                        StatusHttp = 404
                    };
                }
            }

            var classRoomId = _dbContext.ClassRooms.Where(x => x.ClassRoomId == model.ClassRoomId).FirstOrDefaultAsync();

            if (await classRoomId == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El salón de curso seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var courseType = _dbContext.CourseTypes.Where(x => x.CourseTypeId == model.CourseTypeId).FirstOrDefaultAsync();

            if (await courseType == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El tipo de curso seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<Course>.OnBuild(model, new Course());

            _dbContext.Courses.Add(entity);
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
                    var response = await _dbContext.Courses.Where(x => x.CourseId == item 
                                            && x.CourseStatus == Domain.Enums.CourseStatus.Creado).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe o su estado es distinto de creado- id {item}");

                    }

                    _dbContext.Courses.Remove(response);
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


        public async Task<Response<object>> Update(string id, CourseRequest model)
        {
            var response = await _dbContext.Courses.Where(x => x.CourseId == id).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<Course>.OnBuild(model, response);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }

}
