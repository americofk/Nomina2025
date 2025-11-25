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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Employees
{
    public class EmployeeQueryHandler : IQueryHandler<Employee>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<Employee>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            string[] a = (string[])queryfilter;
            WorkStatus work = (WorkStatus)Enum.Parse(typeof(WorkStatus), a[1]);

            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Employees
                .OrderBy(x => x.EmployeeId)
                .Where(x => x.EmployeeStatus == bool.Parse(a[0]) && x.WorkStatus == work)
                .AsQueryable();

            SearchFilter<Employee> validSearch = new SearchFilter<Employee>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<Employee>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<Employee>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        public async Task<Response<Employee>> GetId(object condition)
        {
            var response = await _dbContext.Employees
                .Where(x => x.EmployeeId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<Employee>(response);
        }
    }

}
