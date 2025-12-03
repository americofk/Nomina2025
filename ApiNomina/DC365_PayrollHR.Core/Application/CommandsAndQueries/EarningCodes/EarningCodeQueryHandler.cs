/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EarningCode.
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
    /// Manejador para operaciones de IEarningCodeQuery.
    /// </summary>
    public interface IEarningCodeQueryHandler: IQueryHandler<EarningCode>
    {
        public Task<PagedResponse<IEnumerable<EarningCode>>> GetAllHours(PaginationFilter filter, object queryFilter = null);
        public Task<PagedResponse<IEnumerable<EarningCode>>> GetAllEarnings(PaginationFilter filter, object queryFilter = null);
    }

    /// <summary>

    /// Manejador para operaciones de EarningCodeQuery.

    /// </summary>

    public class EarningCodeQueryHandler : IEarningCodeQueryHandler
    {
        private readonly IApplicationDbContext dbContext;
        public EarningCodeQueryHandler(IApplicationDbContext _applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<EarningCode>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = dbContext.EarningCodes
                .OrderBy(x => x.EarningCodeId)
                .Where(x => x.EarningCodeStatus == (bool)queryFilter)
                .AsQueryable();

            SearchFilter<EarningCode> validSearch = new SearchFilter<EarningCode>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EarningCode>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EarningCode>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="queryFilter">Parametro queryFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<EarningCode>>> GetAllHours(PaginationFilter filter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var response = await dbContext.EarningCodes
                .OrderBy(x => x.EarningCodeId)
                .Where(x => x.EarningCodeStatus == (bool)queryFilter && x.IndexBase == IndexBase.Hora && x.MultiplyAmount != 0)
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            return new PagedResponse<IEnumerable<EarningCode>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="queryFilter">Parametro queryFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<EarningCode>>> GetAllEarnings(PaginationFilter filter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var response = await dbContext.EarningCodes
                .OrderBy(x => x.EarningCodeId)
                .Where(x => x.EarningCodeStatus == (bool)queryFilter && x.IndexBase == IndexBase.MontoFijo)
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            return new PagedResponse<IEnumerable<EarningCode>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<EarningCode>> GetId(object condition)
        {
            var response = await dbContext.EarningCodes
                .Where(x => x.EarningCodeId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<EarningCode>(response);
        }
    }
}
