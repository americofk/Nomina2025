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

namespace DC365_PayrollHR.Core.Application.StoreServices.EarningCodes
{
    public class EarningCodeVersionQueryHandler : IQueryAllHandler<EarningCodeVersion>
    {
        private readonly IApplicationDbContext dbContext;
        public EarningCodeVersionQueryHandler(IApplicationDbContext _applicationDbContext)
        {
            dbContext = _applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<EarningCodeVersion>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryFilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = dbContext.EarningCodeVersions
                .OrderByDescending(x => x.EarningCodeId)
                .Where(x => x.EarningCodeId == (string)queryFilter)
                .AsQueryable();

            SearchFilter<EarningCodeVersion> validSearch = new SearchFilter<EarningCodeVersion>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<EarningCodeVersion>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            return new PagedResponse<IEnumerable<EarningCodeVersion>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        //public async Task<Response<EarningCodeVersion>> GetId(object condition)
        //{
        //    var response = await dbContext.EarningCodeVersions
        //        .Where(x => x.EarningCodeId == (string)condition)
        //        .FirstOrDefaultAsync();

        //    return new Response<EarningCodeVersion>(response);
        //}
    }
}
