using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseLocations
{
    public class CourseLocationQueryHandler : IQueryHandler<CourseLocation>
    {
        private readonly IApplicationDbContext _dbContext;

        public CourseLocationQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<CourseLocation>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.CourseLocations
                                .AsQueryable();

            SearchFilter<CourseLocation> validSearch = new SearchFilter<CourseLocation>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<CourseLocation>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<CourseLocation>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        public async Task<Response<CourseLocation>> GetId(object condition)
        {
            var response = await _dbContext.CourseLocations
                .Where(x=> x.CourseLocationId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<CourseLocation>(response);
        }
    }
}
