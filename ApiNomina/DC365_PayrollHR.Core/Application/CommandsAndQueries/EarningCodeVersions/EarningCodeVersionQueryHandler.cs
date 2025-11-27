/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EarningCodeVersion.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.StoreServices.EarningCodes
{
    /// <summary>
    /// Manejador para operaciones de EarningCodeVersionQuery.
    /// </summary>
    public class EarningCodeVersionQueryHandler : IQueryAllHandler<EarningCodeVersion>
    {
        private readonly IApplicationDbContext dbContext;
        public EarningCodeVersionQueryHandler(IApplicationDbContext _applicationDbContext)
        {
            dbContext = _applicationDbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryFilter">Parametro queryFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<EarningCodeVersion>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = dbContext.EarningCodeVersions
                .OrderByDescending(x => x.EarningCodeId)
                .Where(x => x.EarningCodeId == (string)queryFilter)
                .AsQueryable();

            SearchFilter<EarningCodeVersion> validSearch = new SearchFilter<EarningCodeVersion>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EarningCodeVersion>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            return new PagedResponse<IEnumerable<EarningCodeVersion>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        //public async Task<Response<EarningCodeVersion>> GetId(object condition)
        //{
        //    var response = await dbContext.EarningCodeVersions
        //        .Where(x => x.EarningCodeId == (string)condition)
        //        .FirstOrDefaultAsync();

        //    return new Response<EarningCodeVersion>(response);
        //}
    }
}
