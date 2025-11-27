/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EmployeeDocument.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDocuments;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDocuments
{
    /// <summary>
    /// Manejador para operaciones de EmployeeDocumentQuery.
    /// </summary>
    public class EmployeeDocumentQueryHandler : IQueryHandler<EmployeeDocumentResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeDocumentQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<EmployeeDocumentResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeDocuments
                .OrderBy(x => x.InternalId)
                .Where(x => x.EmployeeId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<EmployeeDocument> validSearch = new SearchFilter<EmployeeDocument>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeDocument>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Select(x => SetObjectResponse(x))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeeDocumentResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        private static EmployeeDocumentResponse SetObjectResponse(EmployeeDocument employeedocuments)
        {
            var a = BuildDtoHelper<EmployeeDocumentResponse>.OnBuild(employeedocuments, new EmployeeDocumentResponse());
            a.HasAttach = employeedocuments.FileAttach == null ? false : true;
            return a;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<EmployeeDocumentResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeeDocuments
                .Where(x => x.EmployeeId == a[0] && x.InternalId == int.Parse(a[1]))
                .Select(x => SetObjectResponse(x))
                .FirstOrDefaultAsync();

            return new Response<EmployeeDocumentResponse>(response);
        }
    }
}
