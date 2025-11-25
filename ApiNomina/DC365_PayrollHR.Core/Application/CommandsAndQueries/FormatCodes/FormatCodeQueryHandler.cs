using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.FormatCodes
{
    public class FormatCodeQueryHandler : IQueryHandler<FormatCode>
    {
        private readonly IApplicationDbContext _dbContext;

        public FormatCodeQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<FormatCode>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.FormatCodes
                .OrderBy(x => x.FormatCodeId)
                .AsQueryable();

            SearchFilter<FormatCode> validSearch = new SearchFilter<FormatCode>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<FormatCode>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<FormatCode>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        public async Task<Response<FormatCode>> GetId(object condition)
        {
            var response = await _dbContext.FormatCodes
                .Where(x => x.FormatCodeId == (string)condition)
                .FirstOrDefaultAsync();

            return new Response<FormatCode>(response);
        }
    }
}
