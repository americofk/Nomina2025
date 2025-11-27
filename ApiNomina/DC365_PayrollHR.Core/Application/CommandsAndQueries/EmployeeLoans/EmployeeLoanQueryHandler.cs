/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EmployeeLoan.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeparments;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeLoans;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeLoans
{
    /// <summary>
    /// Manejador para operaciones de EmployeeLoanQuery.
    /// </summary>
    public class EmployeeLoanQueryHandler : IQueryHandler<EmployeeLoanResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeLoanQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<EmployeeLoanResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {

            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeLoans
                .OrderBy(x => x.LoanId)
                .Where(x => x.EmployeeId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<EmployeeLoan> validSearch = new SearchFilter<EmployeeLoan>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeLoan>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                                .Join(_dbContext.Loans,
                                    el => el.LoanId,
                                    l => l.LoanId,
                                    (el,l) => new {El = el, L = l})
                                .Join(_dbContext.Payrolls,
                                    join => join.El.PayrollId,
                                    payroll => payroll.PayrollId,
                                    (join, payroll) => new { Join = join, Payroll = payroll })
                                .Select(x => SetObjectResponse(x.Join.El, x.Join.L, x.Payroll))
                                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                                .Take(validFilter.PageSize)
                                .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeeLoanResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }


        private static EmployeeLoanResponse SetObjectResponse(EmployeeLoan employeeLoan, Loan loan, Payroll payroll)
        {
            var a = BuildDtoHelper<EmployeeLoanResponse>.OnBuild(employeeLoan, new EmployeeLoanResponse());
            a.LoanName = loan.Name;
            a.PayrollName = payroll.Name;
            return a;
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="condition">Parametro condition.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<EmployeeLoanResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeeLoans
                //.Where(x => x.EmployeeId == a[0] && x.LoanId == a[1])
                .Where(x => x.EmployeeId == a[0] && x.InternalId == int.Parse(a[1]))
                .Join(_dbContext.Loans,
                    el => el.LoanId,
                    l => l.LoanId,
                    (el, l) => new { El = el, L = l })
                .Join(_dbContext.Payrolls,
                    join => join.El.PayrollId,
                    payroll => payroll.PayrollId,
                    (join, payroll) => new { Join = join, Payroll = payroll })
                .Select(x => SetObjectResponse(x.Join.El, x.Join.L, x.Payroll))
                .FirstOrDefaultAsync();

            return new Response<EmployeeLoanResponse>(response);
        }
    }
}
