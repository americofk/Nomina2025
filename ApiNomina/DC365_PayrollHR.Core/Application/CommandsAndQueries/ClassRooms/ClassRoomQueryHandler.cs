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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.ClassRooms
{
    public class ClassRoomQueryHandler : IQueryHandler<ClassRoom>
    {
        private readonly IApplicationDbContext _dbContext;

        public ClassRoomQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<ClassRoom>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.ClassRooms
                .OrderBy(x => x.ClassRoomId)
                .AsQueryable();

            SearchFilter<ClassRoom> validSearch = new SearchFilter<ClassRoom>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<ClassRoom>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<ClassRoom>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        public async Task<Response<ClassRoom>> GetId(object condition)
        {
            var response = await _dbContext.ClassRooms
                .Where(x => x.ClassRoomId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<ClassRoom>(response);
        }
    }

}
