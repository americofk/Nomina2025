/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de CompanyToUser.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Model.User;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CompanyAssignedToUsers
{
    /// <summary>
    /// Manejador para operaciones de CompanyToUserQuery.
    /// </summary>
    public class CompanyToUserQueryHandler : IQueryAllHandler<CompanyToUserResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public CompanyToUserQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryFilter">Parametro queryFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<CompanyToUserResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var user = await _dbContext.Users.Where(x => x.Alias == (string)queryFilter).FirstOrDefaultAsync();

            List<CompanyToUserResponse> response = null;
            IQueryable<CompaniesAssignedToUser> tmpResponse;
            IQueryable<Company> tmpResponseCmpy;

            if (user.ElevationType == Domain.Enums.AdminType.LocalAdmin)
            {
                tmpResponseCmpy = _dbContext.Companies
                                            .AsQueryable();

                SearchFilter<Company> validSearch = new SearchFilter<Company>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<Company>.GetLambdaExpession(validSearch);

                    tmpResponseCmpy = tmpResponseCmpy.Where(lambda)
                                               .AsQueryable();
                }

                response = await tmpResponseCmpy.Select(x => SetObjectResponse(x)).ToListAsync();
            }
            else
            {
                tmpResponse =  _dbContext.CompaniesAssignedToUsers
                                    .OrderBy(x => x.CompanyId)
                                    .Where(x => x.Alias == (string)queryFilter)
                                    .AsQueryable();

                SearchFilter<CompaniesAssignedToUser> validSearch = new SearchFilter<CompaniesAssignedToUser>(searchFilter.PropertyName, searchFilter.PropertyValue);
                if (validSearch.IsValid())
                {
                    var lambda = GenericSearchHelper<CompaniesAssignedToUser>.GetLambdaExpession(validSearch);

                    tmpResponse = tmpResponse.Where(lambda)
                                               .AsQueryable();
                }

                response = await tmpResponse
                    .Join(_dbContext.Companies,
                        assigned => assigned.CompanyId,
                        company => company.CompanyId,
                        (assigned, company) => new { Assigned = assigned, Company = company })
                    .Select(x => SetObjectResponse(x.Assigned, x.Company))
                    .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                    .Take(validFilter.PageSize)
                    .ToListAsync();
            }

            return new PagedResponse<IEnumerable<CompanyToUserResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        private static CompanyToUserResponse SetObjectResponse(CompaniesAssignedToUser companyToUser, Company company)
        {
            var a = BuildDtoHelper<CompanyToUserResponse>.OnBuild(companyToUser, new CompanyToUserResponse());
            a.CompanyName = company.Name;
            return a;
        }

        private static CompanyToUserResponse SetObjectResponse(Company company)
        {
            var a = BuildDtoHelper<CompanyToUserResponse>.OnBuild(company, new CompanyToUserResponse());
            a.CompanyName = company.Name;
            return a;
        }
    }
}
