using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    public interface IQueryAllHandler<T>
    {
        public Task<PagedResponse<IEnumerable<T>>> GetAll(PaginationFilter filter,SearchFilter searchFilter, object queryfilter = null);
    }
}
