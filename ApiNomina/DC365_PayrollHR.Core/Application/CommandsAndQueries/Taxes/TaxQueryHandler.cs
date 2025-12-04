/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Tax.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Taxes;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Taxes
{
    /// <summary>
    /// Manejador para operaciones de TaxQuery.
    /// </summary>
    public class TaxQueryHandler : IQueryHandler<TaxResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public TaxQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<TaxResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Taxes
                .OrderBy(x => x.TaxId)
                .Where(x => x.TaxStatus == (bool)queryfilter)
                .AsQueryable();

            // Verificar si es busqueda en multiples campos (separados por coma)
            if (!string.IsNullOrWhiteSpace(searchFilter.PropertyName) &&
                !string.IsNullOrWhiteSpace(searchFilter.PropertyValue) &&
                searchFilter.PropertyName.Contains(","))
            {
                var searchValue = searchFilter.PropertyValue.ToLower();
                tempResponse = tempResponse.Where(x =>
                    (x.TaxId != null && x.TaxId.ToLower().Contains(searchValue)) ||
                    (x.Name != null && x.Name.ToLower().Contains(searchValue))
                ).AsQueryable();
            }
            else
            {
                SearchFilter<Tax> validSearch = new SearchFilter<Tax>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<Tax>.GetLambdaExpession(validSearch);

                    tempResponse = tempResponse.Where(lambda)
                                               .AsQueryable();
                }
            }

            // Obtener total de registros antes de paginar
            var totalRecords = await tempResponse.CountAsync();

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .Select(x => BuildDtoHelper<TaxResponse>.OnBuild(x, new TaxResponse()))
                            .ToListAsync();

            var pagedResponse = new PagedResponse<IEnumerable<TaxResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
            pagedResponse.TotalRecords = totalRecords;
            pagedResponse.TotalPages = (int)Math.Ceiling(totalRecords / (double)validFilter.PageSize);

            return pagedResponse;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<TaxResponse>> GetId(object condition)
        {
            var response = await _dbContext.Taxes
                .Where(x => x.TaxId == (string)condition)
                .Select(x => BuildDtoHelper<TaxResponse>.OnBuild(x, new TaxResponse()))
                .FirstOrDefaultAsync();

            if (response != null)
            {
                var taxdetails = await _dbContext.TaxDetails
                            .Where(x => x.TaxId == response.TaxId)
                            .ToListAsync();

                response.TaxDetails = taxdetails;
            }

            return new Response<TaxResponse>(response);
        }
    }

}
