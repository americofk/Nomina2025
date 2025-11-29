/// <summary>
/// Manejador de comandos para operaciones CRUD de CalendarHoliday.
/// Gestiona la administración de días festivos en el calendario.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CalendarHolidays;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CalendarHolidays
{
    public interface ICalendarHolidayCommandHandler:
        ICreateCommandHandler<CalendarHolidayRequest>,
        IDeleteByParentCommandHandler<CalendarHolidayDeleteRequest>,
        IUpdateCommandHandler<CalendarHolidayRequest>
    {

    }

    /// <summary>

    /// Manejador para operaciones de CalendarHolidayCommand.

    /// </summary>

    public class CalendarHolidayCommandHandler : ICalendarHolidayCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public CalendarHolidayCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(CalendarHolidayRequest model)
        {
            var entity = BuildDtoHelper<CalendarHoliday>.OnBuild(model, new CalendarHoliday());

            _dbContext.CalendarHolidays.Add(entity);
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

        /// <param name="parentid">Parametro parentid.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<bool>> DeleteByParent(List<CalendarHolidayDeleteRequest> ids, string parentid)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.CalendarHolidays.Where(x => x.CalendarDate == item.CalendarDate).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item.CalendarDate}");
                    }

                    _dbContext.CalendarHolidays.Remove(response);
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

        //Parametro id no se usa en este proceso
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<object>> Update(string id, CalendarHolidayRequest model)
        {
            var response = await _dbContext.CalendarHolidays.Where(x => x.CalendarDate == model.CalendarDate).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            var entity = BuildDtoHelper<CalendarHoliday>.OnBuild(model, response);
            await _dbContext.SaveChangesAsync();

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }
    }
}
