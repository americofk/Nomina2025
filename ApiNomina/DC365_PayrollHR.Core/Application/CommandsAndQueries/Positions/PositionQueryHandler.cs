/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Position.
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Positions
{
    /// <summary>
    /// Manejador para operaciones de PositionQuery.
    /// </summary>
    public class PositionQueryHandler : IQueryHandler<Position>
    {
        private readonly IApplicationDbContext _dbContext;

        public PositionQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        //queryFilter is array 0 = PositonStatus, 1 = IsVacants
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="filter">Parametro filter.</param>
        /// <param name="searchFilter">Parametro searchFilter.</param>
        /// <param name="queryfilter">Parametro queryfilter.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<PagedResponse<IEnumerable<Position>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            bool[] filters = (bool[])queryfilter;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Positions
                .OrderBy(x => x.PositionId)
                .Where(x => x.PositionStatus == filters[0] && x.IsVacant == filters[1])
                .AsQueryable();

            SearchFilter<Position> validSearch = new SearchFilter<Position>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<Position>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<Position>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<Position>> GetId(object condition)
        {
            var response = await _dbContext.Positions
                .Where(x => x.PositionId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<Position>(response);
        }
    }

}
