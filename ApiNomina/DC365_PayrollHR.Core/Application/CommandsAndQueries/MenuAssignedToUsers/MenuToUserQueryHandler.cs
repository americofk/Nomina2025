using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.MenuAssignedToUsers
{
    public class MenuToUserQueryHandler : IQueryAllHandler<MenuToUserResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public MenuToUserQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<MenuToUserResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.MenuAssignedToUsers
                .OrderBy(x => x.MenuId)
                .Where(x => x.Alias == (string)queryFilter)
                .AsQueryable();

            SearchFilter<MenuAssignedToUser> validSearch = new SearchFilter<MenuAssignedToUser>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<MenuAssignedToUser>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Join(_dbContext.MenusApp,
                                assigned => assigned.MenuId,
                                menu => menu.MenuId,
                                (assigned, menu) => new {Assigned = assigned , Menu = menu})
                            .Select(x => SetObjectResponse(x.Assigned, x.Menu))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<MenuToUserResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        private static MenuToUserResponse SetObjectResponse(MenuAssignedToUser menuToUser, MenuApp menuApp)
        {
            var a = BuildDtoHelper<MenuToUserResponse>.OnBuild(menuToUser, new MenuToUserResponse());
            a.Description = menuApp.Description;
            return a;
        }
    }
}
