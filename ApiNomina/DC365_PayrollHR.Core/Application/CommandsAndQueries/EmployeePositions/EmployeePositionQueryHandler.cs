using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeePositions
{
    public class EmployeePositionQueryHandler : IQueryHandler<EmployeePositionResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeePositionQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<EmployeePositionResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.EmployeePositions
                .OrderBy(x => x.PositionId)
                .Where(x => x.EmployeeId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<EmployeePosition> validSearch = new SearchFilter<EmployeePosition>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EmployeePosition>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Join(_dbContext.Positions,
                                employeeposition => employeeposition.PositionId,
                                position => position.PositionId,
                                (employeeposition, position) => new { EmployeePosition = employeeposition, Position = position })
                            .Select(x => SetObjectResponse(x.EmployeePosition, x.Position))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<EmployeePositionResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        private static EmployeePositionResponse SetObjectResponse(EmployeePosition employeePosition, Position position)
        {
            var a = BuildDtoHelper<EmployeePositionResponse>.OnBuild(employeePosition, new EmployeePositionResponse());
            a.PositionName = position.PositionName;
            return a;
        }

        public async Task<Response<EmployeePositionResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.EmployeePositions
                .Where(x => x.EmployeeId == a[0] && x.PositionId == a[1])
                .Join(_dbContext.Positions,
                    employeeposition => employeeposition.PositionId,
                    position => position.PositionId,
                    (employeeposition, position) => new { EmployeePosition = employeeposition, Position = position })
                .Select(x => SetObjectResponse(x.EmployeePosition, x.Position))
                .FirstOrDefaultAsync();

            return new Response<EmployeePositionResponse>(response);
        }
    }
}
