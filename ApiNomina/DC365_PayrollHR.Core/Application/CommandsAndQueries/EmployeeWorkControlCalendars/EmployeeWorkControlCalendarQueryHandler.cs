using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkControlCalendars;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeWorkControlCalendars
{
    public class EmployeeWorkControlCalendarQueryHandler : IQueryHandler<EmployeeWorkControlCalendarResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeWorkControlCalendarQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedResponse<IEnumerable<EmployeeWorkControlCalendarResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeeWorkControlCalendars
                .OrderByDescending(x => x.CalendarDate)
                .Where(x => x.EmployeeId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<EmployeeWorkControlCalendar> validSearch = new SearchFilter<EmployeeWorkControlCalendar>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeeWorkControlCalendar>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Select(x => SetObjectResponse(x))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeeWorkControlCalendarResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        public async Task<Response<EmployeeWorkControlCalendarResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeeWorkControlCalendars
                .Where(x => x.InternalId == int.Parse(a[1]) && x.EmployeeId == a[0])
                .Select(x => SetObjectResponse(x))
                .FirstOrDefaultAsync();

            return new Response<EmployeeWorkControlCalendarResponse>(response);
        }

        private static EmployeeWorkControlCalendarResponse SetObjectResponse(EmployeeWorkControlCalendar employeeWorkCalendar)
        {
            var a = BuildDtoHelper<EmployeeWorkControlCalendarResponse>.OnBuild(employeeWorkCalendar, new EmployeeWorkControlCalendarResponse());
            return a;
        }
    }
}
