/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de ProjCategory.
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.ProjCategories
{
    /// <summary>
    /// Manejador para operaciones de ProjCategoryQuery.
    /// </summary>
    public class ProjCategoryQueryHandler : IQueryHandler<ProjCategory>
    {
        private readonly IApplicationDbContext _dbContext;

        public ProjCategoryQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<ProjCategory>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.ProjCategories
                .OrderBy(x => x.ProjCategoryId)
                .Where(x => x.ProjCategoryStatus == (bool)queryfilter)
                .AsQueryable();

            // Verificar si es busqueda en multiples campos (separados por coma)
            if (!string.IsNullOrWhiteSpace(searchFilter.PropertyName) &&
                !string.IsNullOrWhiteSpace(searchFilter.PropertyValue) &&
                searchFilter.PropertyName.Contains(","))
            {
                var searchValue = searchFilter.PropertyValue.ToLower();
                tempResponse = tempResponse.Where(x =>
                    (x.ProjCategoryId != null && x.ProjCategoryId.ToLower().Contains(searchValue)) ||
                    (x.CategoryName != null && x.CategoryName.ToLower().Contains(searchValue))
                ).AsQueryable();
            }
            else
            {
                SearchFilter<ProjCategory> validSearch = new SearchFilter<ProjCategory>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<ProjCategory>.GetLambdaExpession(validSearch);

                    tempResponse = tempResponse.Where(lambda)
                                               .AsQueryable();
                }
            }

            // Obtener total de registros antes de paginar
            var totalRecords = await tempResponse.CountAsync();

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            var pagedResponse = new PagedResponse<IEnumerable<ProjCategory>>(response, validFilter.PageNumber, validFilter.PageSize);
            pagedResponse.TotalRecords = totalRecords;
            pagedResponse.TotalPages = (int)Math.Ceiling(totalRecords / (double)validFilter.PageSize);

            return pagedResponse;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<ProjCategory>> GetId(object condition)
        {
            var response = await _dbContext.ProjCategories
                .Where(x => x.ProjCategoryId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<ProjCategory>(response);
        }
    }

}
