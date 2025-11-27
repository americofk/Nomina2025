/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de DeductionCodeVersion.
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
    /// Manejador para operaciones de DeductionCodeVersionQuery.
    /// </summary>
    public class DeductionCodeVersionQueryHandler : IQueryHandler<DeductionCodeVersion>
    {
        private readonly IApplicationDbContext _dbContext;
        public DeductionCodeVersionQueryHandler(IApplicationDbContext _applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<DeductionCodeVersion>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.DeductionCodeVersions
                                    .OrderBy(x => x.DeductionCodeId)
                                    .Where(x => x.DeductionCodeId == (string)queryFilter)
                                    .AsQueryable();

            SearchFilter<DeductionCodeVersion> validSearch = new SearchFilter<DeductionCodeVersion>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<DeductionCodeVersion>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                                .Take(validFilter.PageSize)
                                .ToListAsync();

            return new PagedResponse<IEnumerable<DeductionCodeVersion>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<DeductionCodeVersion>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.DeductionCodeVersions
                .Where(x => x.DeductionCodeId == a[0] && x.InternalId == int.Parse(a[1]))
                .FirstOrDefaultAsync();

            return new Response<DeductionCodeVersion>(response);
        }
    }
}
