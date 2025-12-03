/// <summary>
/// Manejador de consultas para obtención de datos de SeveranceProcess.
/// Facilita la recuperación de información mediante consultas optimizadas.
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.SeveranceProcesses
{
    /// <summary>
    /// Manejador para operaciones de SeveranceProcessQuery.
    /// </summary>
    public class SeveranceProcessQueryHandler : IQueryHandler<SeveranceProcess>
    {
        private readonly IApplicationDbContext _dbContext;

        public SeveranceProcessQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="filter">Parametro filter.</param>
        /// <param name="searchFilter">Parametro searchFilter.</param>
        /// <param name="queryFilter">Parametro queryFilter.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<PagedResponse<IEnumerable<SeveranceProcess>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.SeveranceProcesses
                                .OrderByDescending(x => x.CreatedOn)
                                .AsQueryable();

            SearchFilter<SeveranceProcess> validSearch = new SearchFilter<SeveranceProcess>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<SeveranceProcess>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<SeveranceProcess>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="condition">Parametro condition.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<SeveranceProcess>> GetId(object condition)
        {
            var processId = (string)condition;

            var response = await _dbContext.SeveranceProcesses
                .Where(x => x.SeveranceProcessId == processId)
                .FirstOrDefaultAsync();

            if (response != null)
            {
                // Cargar los detalles del proceso
                response.Details = await _dbContext.SeveranceProcessDetails
                    .Where(x => x.SeveranceProcessId == processId)
                    .OrderBy(x => x.InternalId)
                    .ToListAsync();
            }

            return new Response<SeveranceProcess>(response);
        }
    }
}
