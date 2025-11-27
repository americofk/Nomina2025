/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EmployeeWorkCalendar.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkCalendars;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeWorkCalendars
{
    /// <summary>
    /// Manejador para operaciones de EmployeeWorkCalendarQuery.
    /// </summary>
    public class EmployeeWorkCalendarQueryHandler: IQueryHandler<EmployeeWorkCalendarResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeWorkCalendarQueryHandler(IApplicationDbContext dbContext)
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

        public async Task<PagedResponse<IEnumerable<EmployeeWorkCalendarResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeWorkCalendars
                .OrderByDescending(x => x.CalendarDate)
                .Where(x => x.EmployeeId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<EmployeeWorkCalendar> validSearch = new SearchFilter<EmployeeWorkCalendar>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeWorkCalendar>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Select(x => SetObjectResponse(x))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeeWorkCalendarResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<EmployeeWorkCalendarResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeeWorkCalendars
                .Where(x => x.InternalId == int.Parse(a[1]) && x.EmployeeId == a[0])
                .Select(x => SetObjectResponse(x))
                .FirstOrDefaultAsync();

            return new Response<EmployeeWorkCalendarResponse>(response);
        }

        private static EmployeeWorkCalendarResponse SetObjectResponse(EmployeeWorkCalendar employeeWorkCalendar)
        {
            var a = BuildDtoHelper<EmployeeWorkCalendarResponse>.OnBuild(employeeWorkCalendar, new EmployeeWorkCalendarResponse());
            return a;
        }
    }
}
