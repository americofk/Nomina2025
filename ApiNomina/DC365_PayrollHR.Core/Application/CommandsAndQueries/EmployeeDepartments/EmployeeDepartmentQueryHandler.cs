using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeparments;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDepartments
{
    public class EmployeeDepartmentQueryHandler : IQueryHandler<EmployeeDepartmentResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeDepartmentQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<EmployeeDepartmentResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeDepartments
                .OrderBy(x => x.DepartmentId)
                .Where(x => x.EmployeeId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<EmployeeDepartment> validSearch = new SearchFilter<EmployeeDepartment>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeDepartment>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }
            var response = await tempResponse
                            .Join(_dbContext.Departments,
                                employeedepartment => employeedepartment.DepartmentId,
                                department => department.DepartmentId,
                                (employeedepartment, department) => new { EmployeeDepartment = employeedepartment, Department = department })
                            .Select(x => SetObjectResponse(x.EmployeeDepartment, x.Department))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeeDepartmentResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        private static EmployeeDepartmentResponse SetObjectResponse(EmployeeDepartment employeeDepartment, Department department)
        {
            var a = BuildDtoHelper<EmployeeDepartmentResponse>.OnBuild(employeeDepartment, new EmployeeDepartmentResponse());
            a.DepartmentName = department.Name;
            return a;
        }

        public async Task<Response<EmployeeDepartmentResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeeDepartments
                .Where(x => x.EmployeeId == a[0] && x.DepartmentId == a[1])
                .Join(_dbContext.Departments,
                    employeedepartment => employeedepartment.DepartmentId,
                    department => department.DepartmentId,
                    (employeedepartment, department) => new { EmployeeDepartment = employeedepartment, Department = department })
                .Select(x => SetObjectResponse(x.EmployeeDepartment, x.Department))
                .FirstOrDefaultAsync();

            return new Response<EmployeeDepartmentResponse>(response);
        }
    }
}
