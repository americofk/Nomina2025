using DC365_PayrollHR.Core.Application.Common.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    public interface IValidatePrivilege
    {
        //public Task<bool> ValidateMenu(string Alias, string MenuId);

        public Task<bool> ValidateAction(string Alias, string MenuId, bool View, bool Delete, bool Edit);
    }
}
