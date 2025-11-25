using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Provinces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Provinces
{
    public class ProvinceQueryHandler: IQueryAllHandler<ProvinceResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public ProvinceQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<ProvinceResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            List<ProvinceResponse> response = await _dbContext.Provinces
                                     .OrderBy(x => x.ProvinceId)
                                     .Select(x => BuildDtoHelper<ProvinceResponse>.OnBuild(x, new ProvinceResponse()))
                                     .ToListAsync();

            return new PagedResponse<IEnumerable<ProvinceResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
