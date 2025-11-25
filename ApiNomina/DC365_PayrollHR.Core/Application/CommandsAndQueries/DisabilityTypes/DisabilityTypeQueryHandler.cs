using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.DisabilityTypes
{
    public class DisabilityTypeQueryHandler: IQueryAllWithoutSearchHandler<DisabilityType>
    {
        private readonly IApplicationDbContext _dbContext;

        public DisabilityTypeQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedResponse<IEnumerable<DisabilityType>>> GetAll(PaginationFilter filter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var response = await _dbContext.DisabilityTypes
                            .OrderBy(x => x.DisabilityTypeId)
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<DisabilityType>>(response, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
