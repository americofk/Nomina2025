/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Payroll.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.PayCycles;
using DC365_PayrollHR.Core.Application.Common.Model.Payrolls;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.StoreServices.Payrolls
{
    /// <summary>
    /// Manejador para operaciones de PayrollQuery.
    /// </summary>
    public class PayrollQueryHandler : IQueryHandler<PayrollResponse>
    {
        private readonly IApplicationDbContext dbContext;
        private readonly IQueryHandler<PayCycleResponse> _queryHandler;

        public PayrollQueryHandler(IApplicationDbContext _applicationDbContext, IQueryHandler<PayCycleResponse> queryHandler)
        {
            dbContext = _applicationDbContext;
            _queryHandler = queryHandler;
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="filter">Parametro filter.</param>


        /// <param name="searchFilter">Parametro searchFilter.</param>


        /// <param name="queryFilter">Parametro queryFilter.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<PagedResponse<IEnumerable<PayrollResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = dbContext.Payrolls
                .OrderBy(x => x.PayrollId)
                .Where(x => x.PayrollStatus == (bool)queryFilter)
                .AsQueryable();

            // Verificar si es busqueda en multiples campos (separados por coma)
            if (!string.IsNullOrWhiteSpace(searchFilter.PropertyName) &&
                !string.IsNullOrWhiteSpace(searchFilter.PropertyValue) &&
                searchFilter.PropertyName.Contains(","))
            {
                var searchValue = searchFilter.PropertyValue.ToLower();
                tempResponse = tempResponse.Where(x =>
                    (x.PayrollId != null && x.PayrollId.ToLower().Contains(searchValue)) ||
                    (x.Name != null && x.Name.ToLower().Contains(searchValue))
                ).AsQueryable();
            }
            else
            {
                SearchFilter<Payroll> validSearch = new SearchFilter<Payroll>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<Payroll>.GetLambdaExpession(validSearch);

                    tempResponse = tempResponse.Where(lambda)
                                               .AsQueryable();
                }
            }

            // Obtener total de registros antes de paginar
            var totalRecords = await tempResponse.CountAsync();

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .Select(x => BuildDtoHelper<PayrollResponse>.OnBuild(x, new PayrollResponse()))
                            .ToListAsync();

            var pagedResponse = new PagedResponse<IEnumerable<PayrollResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
            pagedResponse.TotalRecords = totalRecords;
            pagedResponse.TotalPages = (int)Math.Ceiling(totalRecords / (double)validFilter.PageSize);

            return pagedResponse;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<PayrollResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await dbContext.Payrolls
                .OrderBy(x => x.PayrollId)
                .Where(x => x.PayrollId == a[0])
                .Select(x => BuildDtoHelper<PayrollResponse>.OnBuild(x, new PayrollResponse()))
                .FirstOrDefaultAsync();

            //true añade la lista de ciclos
            if (bool.Parse(a[1]))
            {
                if (response != null)
                {
                    var payCycles = await _queryHandler.GetAll(new PaginationFilter(), new SearchFilter(), response.PayrollId) ;
                    response.PayCycles = (List<PayCycle>)payCycles.Data;
                }
            }

            return new Response<PayrollResponse>(response);
        }
    }
}
