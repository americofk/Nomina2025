/// <summary>
/// Manejador de consultas para obtención de datos de CalendarHoliday.
/// Facilita la recuperación de información de días festivos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
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
    /// <summary>
    /// Manejador para operaciones de CalendarHolidayQuery.
    /// </summary>
    public class CalendarHolidayQueryHandler : IQueryAllHandler<CalendarHoliday>
    {
        private readonly IApplicationDbContext _dbContext;

        public CalendarHolidayQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<CalendarHoliday>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.CalendarHolidays
                                        .OrderByDescending(x => x.CalendarDate)
                                        .AsQueryable();

            // Busqueda por descripcion
            if (!string.IsNullOrWhiteSpace(searchFilter.PropertyValue))
            {
                var searchValue = searchFilter.PropertyValue.ToLower();
                tempResponse = tempResponse.Where(x =>
                    x.Description != null && x.Description.ToLower().Contains(searchValue)
                ).AsQueryable();
            }

            // Obtener total de registros antes de paginar
            var totalRecords = await tempResponse.CountAsync();

            var response = await tempResponse
                                        .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                                        .Take(validFilter.PageSize)
                                        .ToListAsync();

            var pagedResponse = new PagedResponse<IEnumerable<CalendarHoliday>>(response, validFilter.PageNumber, validFilter.PageSize);
            pagedResponse.TotalRecords = totalRecords;
            pagedResponse.TotalPages = (int)Math.Ceiling(totalRecords / (double)validFilter.PageSize);

            return pagedResponse;
        }
    }
}
