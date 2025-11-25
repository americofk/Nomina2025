using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers
{
    public class CompanyToUserRequest
    {
        public string CompanyId { get; set; }
        public string Alias { get; set; }
    }
}
