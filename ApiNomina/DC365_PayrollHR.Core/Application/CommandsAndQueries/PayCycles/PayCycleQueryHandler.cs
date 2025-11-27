/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de PayCycle.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.PayCycles;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.PayCycles
{
    /// <summary>
    /// Manejador para operaciones de PayCycleQuery.
    /// </summary>
    public class PayCycleQueryHandler : IQueryHandler<PayCycleResponse>
    {
        private readonly IApplicationDbContext dbContext;

        public PayCycleQueryHandler(IApplicationDbContext _applicationDbContext)
        {
            dbContext = _applicationDbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<PayCycleResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = dbContext.PayCycles
                .OrderBy(x => x.PayCycleId)
                .Where(x => x.PayrollId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<PayCycle> validSearch = new SearchFilter<PayCycle>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<PayCycle>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Join(dbContext.Payrolls,
                                c => c.PayrollId,
                                p => p.PayrollId,
                                (c, p) => new { C = c, P = p })
                            .Select(x => SetObjectResponse(x.C, x.P))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<PayCycleResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public Task<Response<PayCycleResponse>> GetId(object condition)
        {
            throw new NotImplementedException();
        }

        private static PayCycleResponse SetObjectResponse(PayCycle paycycle, Payroll payroll)
        {
            var a = BuildDtoHelper<PayCycleResponse>.OnBuild(paycycle, new PayCycleResponse());
            a.PayFrecuency = payroll.PayFrecuency;

            return a;
        }
    }
}
