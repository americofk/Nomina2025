/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Job.
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Jobs
{
    /// <summary>
    /// Manejador para operaciones de JobQuery.
    /// </summary>
    public class JobQueryHandler : IQueryHandler<Job>
    {
        private readonly IApplicationDbContext _dbContext;

        public JobQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<Job>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Jobs
                .OrderBy(x => x.JobId)
                .Where(x => x.JobStatus == (bool)queryfilter)
                .AsQueryable();

            SearchFilter<Job> validSearch = new SearchFilter<Job>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<Job>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<Job>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<Job>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.Jobs
                .Where(x => x.JobStatus == bool.Parse(a[0]) && x.JobId == a[1])
                .FirstOrDefaultAsync();

            return new Response<Job>(response);
        }
    }
}
