/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de TaxDetail.
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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.TaxDetails
{
    /// <summary>
    /// Manejador para operaciones de TaxDetailQuery.
    /// </summary>
    public class TaxDetailQueryHandler : IQueryHandler<TaxDetail>
    {
        private readonly IApplicationDbContext _dbContext;

        public TaxDetailQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<TaxDetail>>> GetAll(PaginationFilter filter, SearchFilter searchFilter,  object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.TaxDetails
                .Where(x => x.TaxId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<TaxDetail> validSearch = new SearchFilter<TaxDetail>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<TaxDetail>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                                .Take(validFilter.PageSize)
                                .ToListAsync();

            return new PagedResponse<IEnumerable<TaxDetail>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        //Condition 0 = Taxid, 1 = InternalId 
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="condition">Parametro condition.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<TaxDetail>> GetId(object condition)
        {
            string[] a = (string[])condition;
            var response = await _dbContext.TaxDetails
                .Where(x => x.TaxId == a[0] && x.InternalId == int.Parse(a[1]))
                .FirstOrDefaultAsync();

            return new Response<TaxDetail>(response);
        }
    }

}
