using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Taxes;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Taxes
{
    public class TaxQueryHandler : IQueryHandler<TaxResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public TaxQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<PagedResponse<IEnumerable<TaxResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Taxes
                .Where(x => x.TaxStatus == (bool)queryfilter)
                .AsQueryable();

            SearchFilter<Tax> validSearch = new SearchFilter<Tax>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<Tax>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .Select(x => BuildDtoHelper<TaxResponse>.OnBuild(x, new TaxResponse()))
                            .ToListAsync();

            return new PagedResponse<IEnumerable<TaxResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        public async Task<Response<TaxResponse>> GetId(object condition)
        {
            var response = await _dbContext.Taxes
                .Where(x => x.TaxId == (string)condition)
                .Select(x => BuildDtoHelper<TaxResponse>.OnBuild(x, new TaxResponse()))
                .FirstOrDefaultAsync();

            if (response != null)
            {
                var taxdetails = await _dbContext.TaxDetails
                            .Where(x => x.TaxId == response.TaxId)
                            .ToListAsync();

                response.TaxDetails = taxdetails;
            }

            return new Response<TaxResponse>(response);
        }
    }

}
