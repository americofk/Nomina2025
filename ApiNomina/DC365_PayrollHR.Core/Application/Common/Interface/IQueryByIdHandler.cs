using DC365_PayrollHR.Core.Application.Common.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    public interface IQueryByIdHandler<T>
    {
        public Task<Response<T>> GetId(string id);
    }
}
