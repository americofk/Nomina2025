/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Company.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Companies;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Companies
{
    /// <summary>
    /// Manejador para operaciones de ICompanyQuery.
    /// </summary>
    public interface ICompanyQueryHandler: IQueryHandler<CompanyResponse>
    {
        public Task<PagedResponse<IEnumerable<CompanyResponse>>> GetAll(PaginationFilter filter);
    }

    /// <summary>

    /// Manejador para operaciones de CompanyQuery.

    /// </summary>

    public class CompanyQueryHandler : ICompanyQueryHandler
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserInformation _currentUserInformation;

        public CompanyQueryHandler(IApplicationDbContext applicationDbContext, ICurrentUserInformation currentUserInformation)
        {
            _dbContext = applicationDbContext;
            _currentUserInformation = currentUserInformation;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<CompanyResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var adminType = (AdminType)Enum.Parse(typeof(AdminType), _currentUserInformation.ElevationType);

            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            IQueryable<Company> tempResponse;
            List<CompanyResponse> response;

            if (adminType == AdminType.AdministradorLocal)
            {
                tempResponse =  _dbContext.Companies
                                        .OrderBy(x => x.CompanyId)
                                        .AsQueryable();

                SearchFilter<Company> validSearch = new SearchFilter<Company>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<Company>.GetLambdaExpession(validSearch);

                    tempResponse = tempResponse.Where(lambda)
                                               .AsQueryable();
                }

                response = await tempResponse
                            .Where(x => x.CompanyStatus == true)
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .Select(x => BuildDtoHelper<CompanyResponse>.OnBuild(x, new CompanyResponse()))
                            .ToListAsync();
            }
            else
            {
                response = new List<CompanyResponse>();
            }

            return new PagedResponse<IEnumerable<CompanyResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<CompanyResponse>> GetId(object condition)
        {
            var response = await _dbContext.Companies
                .Where(x => x.CompanyId == (string)condition)
                .Select(x => new CompanyResponse()
                {
                    Name = x.Name,
                    CompanyId = x.CompanyId
                })
                .FirstOrDefaultAsync();

            return new Response<CompanyResponse>(response);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<CompanyResponse>>> GetAll(PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            List<CompanyResponse> response = await _dbContext.Companies
                                     .OrderBy(x => x.CompanyId)
                                     .Where( x => x.LicenseKey != null)
                                     .Select(x => BuildDtoHelper<CompanyResponse>.OnBuild(x, new CompanyResponse()))
                                     .ToListAsync();

            return new PagedResponse<IEnumerable<CompanyResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
