/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EmployeeHistory.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeHistories
{
    /// <summary>
    /// Manejador para operaciones de EmployeeHistoryQuery.
    /// </summary>
    public class EmployeeHistoryQueryHandler : IQueryAllHandler<EmployeeHistoryResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeHistoryQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<EmployeeHistoryResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeHistories
                .OrderBy(x => x.EmployeeHistoryId)
                .AsQueryable();

            SearchFilter<EmployeeHistory> validSearch = new SearchFilter<EmployeeHistory>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeHistory>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Where(x => x.EmployeeId == (string)queryfilter)
                            .Select(x => BuildDtoHelper<EmployeeHistoryResponse>.OnBuild(x, new EmployeeHistoryResponse()))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeeHistoryResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

    }
}
