/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de CourseType.
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseTypes
{
    /// <summary>
    /// Manejador para operaciones de CourseTypeQuery.
    /// </summary>
    public class CourseTypeQueryHandler : IQueryHandler<CourseType>
    {
        private readonly IApplicationDbContext _dbContext;

        public CourseTypeQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<CourseType>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.CourseTypes
                .AsQueryable();

            SearchFilter<CourseType> validSearch = new SearchFilter<CourseType>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<CourseType>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<CourseType>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<CourseType>> GetId(object condition)
        {
            var response = await _dbContext.CourseTypes
                .Where(x => x.CourseTypeId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<CourseType>(response);
        }
    }
}
