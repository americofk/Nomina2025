/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de PayrollProcessDetail.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.PayrollProcessDetails
{
    /// <summary>
    /// Manejador para operaciones de PayrollProcessDetailQuery.
    /// </summary>
    public class PayrollProcessDetailQueryHandler : IQueryHandler<PayrollProcessDetail>
    {
        private readonly IApplicationDbContext _dbContext;

        public PayrollProcessDetailQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<PayrollProcessDetail>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.PayrollProcessDetails
                .OrderBy(x => x.EmployeeId)
                .Where(x => x.PayrollProcessId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<PayrollProcessDetail> validSearch = new SearchFilter<PayrollProcessDetail>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<PayrollProcessDetail>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<PayrollProcessDetail>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        //condition 0 = payrollprocessid, 1 = employee
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="condition">Parametro condition.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<PayrollProcessDetail>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.PayrollProcessDetails
                .Where(x => x.PayrollProcessId == a[0] && 
                       x.EmployeeId == a[1])
                .FirstOrDefaultAsync();

            return new Response<PayrollProcessDetail>(response);
        }
    }

}
