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

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Currencies
{
    public class CurrencyQueryHandler : IQueryAllWithoutSearchHandler<Currency>
    {
        private readonly IApplicationDbContext _dbContext;

        public CurrencyQueryHandler(IApplicationDbContext _applicationDbContext)
        {
            _dbContext = _applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<Currency>>> GetAll(PaginationFilter filter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var response = await _dbContext.Currencies
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<Currency>>(response, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
