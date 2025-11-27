/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EmployeeLoanHistory.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeLoans;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeLoans
{
    /// <summary>
    /// Manejador para operaciones de EmployeeLoanHistoryQuery.
    /// </summary>
    public class EmployeeLoanHistoryQueryHandler : IQueryHandler<EmployeeLoanHistoryResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeLoanHistoryQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<EmployeeLoanHistoryResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            string[] a = (string[])queryfilter;

            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeLoanHistories
                .OrderBy(x => x.InternalId)
                .Where(x => x.ParentInternalId == int.Parse(a[0]) && x.EmployeeId == a[1])
                .AsQueryable();

            SearchFilter<EmployeeLoanHistory> validSearch = new SearchFilter<EmployeeLoanHistory>(searchFilter.PropertyName, searchFilter.PropertyValue);

            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeLoanHistory>.GetLambdaExpession(validSearch);

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

            return new PagedResponse<IEnumerable<EmployeeLoanHistoryResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }


        private static EmployeeLoanHistoryResponse SetObjectResponse(EmployeeLoanHistory employeeLoan, Loan loan, Payroll payroll)
        {
            var a = BuildDtoHelper<EmployeeLoanHistoryResponse>.OnBuild(employeeLoan, new EmployeeLoanHistoryResponse());
            a.LoanName = loan.Name;
            a.PayrollName = payroll.Name;
            return a;
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="condition">Parametro condition.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<EmployeeLoanHistoryResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeeLoanHistories
                .Where(x => x.EmployeeId == a[0] && x.LoanId == a[1])
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

            return new Response<EmployeeLoanHistoryResponse>(response);
        }
    }
}
