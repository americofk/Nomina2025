/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de DeductionCode.
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

namespace DC365_PayrollHR.Core.Application.StoreServices.DeductionCodes
{
    /// <summary>
    /// Manejador para operaciones de DeductionCodeQuery.
    /// </summary>
    public class DeductionCodeQueryHandler : IQueryHandler<DeductionCode>
    {
        private readonly IApplicationDbContext _dbContext;
        public DeductionCodeQueryHandler(IApplicationDbContext _applicationDbContext)
        {
            _dbContext = _applicationDbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryFilter">Parametro queryFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<DeductionCode>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.DeductionCodes
                .OrderBy(x => x.DeductionCodeId)
                .Where(x => x.DeductionStatus == (bool)queryFilter)
                .AsQueryable();

            // Verificar si es busqueda en multiples campos (separados por coma)
            if (!string.IsNullOrWhiteSpace(searchFilter.PropertyName) &&
                !string.IsNullOrWhiteSpace(searchFilter.PropertyValue) &&
                searchFilter.PropertyName.Contains(","))
            {
                var searchValue = searchFilter.PropertyValue.ToLower();
                tempResponse = tempResponse.Where(x =>
                    (x.DeductionCodeId != null && x.DeductionCodeId.ToLower().Contains(searchValue)) ||
                    (x.Name != null && x.Name.ToLower().Contains(searchValue))
                ).AsQueryable();
            }
            else
            {
                SearchFilter<DeductionCode> validSearch = new SearchFilter<DeductionCode>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<DeductionCode>.GetLambdaExpession(validSearch);

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

            var pagedResponse = new PagedResponse<IEnumerable<DeductionCode>>(response, validFilter.PageNumber, validFilter.PageSize);
            pagedResponse.TotalRecords = totalRecords;
            pagedResponse.TotalPages = (int)Math.Ceiling(totalRecords / (double)validFilter.PageSize);

            return pagedResponse;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<DeductionCode>> GetId(object condition)
        {
            var response = await _dbContext.DeductionCodes
                .Where(x => x.DeductionCodeId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<DeductionCode>(response);
        }
    }
}
