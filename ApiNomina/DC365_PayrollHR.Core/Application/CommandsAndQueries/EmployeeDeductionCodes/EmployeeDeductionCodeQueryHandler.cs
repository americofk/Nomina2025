/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de EmployeeDeductionCode.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeductionCodes;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDeductionCodes
{
    /// <summary>
    /// Manejador para operaciones de EmployeeDeductionCodeQuery.
    /// </summary>
    public class EmployeeDeductionCodeQueryHandler : IQueryHandler<EmployeeDeductionCodeResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeDeductionCodeQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<EmployeeDeductionCodeResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeDeductionCodes
                .OrderBy(x => x.DeductionCodeId)
                .Where(x => x.EmployeeId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<EmployeeDeductionCode> validSearch = new SearchFilter<EmployeeDeductionCode>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeDeductionCode>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Join(_dbContext.DeductionCodes,
                                employeededuction => employeededuction.DeductionCodeId,
                                deduction => deduction.DeductionCodeId,
                                (employeededuction, deduction) => new { EmployeeDeduction = employeededuction, Deduction = deduction })
                            .Join(_dbContext.Payrolls,
                                join => join.EmployeeDeduction.PayrollId,
                                payroll => payroll.PayrollId,
                                (join, payroll) => new { Join = join, Payroll = payroll })
                            .Select(x => SetObjectResponse(x.Join.EmployeeDeduction, x.Join.Deduction, x.Payroll))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeeDeductionCodeResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<EmployeeDeductionCodeResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeeDeductionCodes
                .Where(x => x.EmployeeId == a[0] && x.DeductionCodeId == a[1])
                .Join(_dbContext.DeductionCodes,
                    employeededuction => employeededuction.DeductionCodeId,
                    deduction => deduction.DeductionCodeId,
                    (employeededuction, deduction) => new { EmployeeDeduction = employeededuction, Deduction = deduction })
                .Join(_dbContext.Payrolls,
                    join => join.EmployeeDeduction.PayrollId,
                    payroll => payroll.PayrollId,
                    (join, payroll) => new { Join = join, Payroll = payroll })
                .Select(x => SetObjectResponse(x.Join.EmployeeDeduction, x.Join.Deduction, x.Payroll))
                .FirstOrDefaultAsync();

            return new Response<EmployeeDeductionCodeResponse>(response);
        }

        private static EmployeeDeductionCodeResponse SetObjectResponse(EmployeeDeductionCode employeeDeductionCode, DeductionCode deductionCode, Payroll payroll)
        {
            var a = BuildDtoHelper<EmployeeDeductionCodeResponse>.OnBuild(employeeDeductionCode, new EmployeeDeductionCodeResponse());
            a.DeductionName = deductionCode.Name;
            a.PayrollName = payroll.Name;

            return a;
        }
    }
}
