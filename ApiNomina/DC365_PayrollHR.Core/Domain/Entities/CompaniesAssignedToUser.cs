using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class CompaniesAssignedToUser : AuditableEntity
    {
        public string CompanyId { get; set; }
        public string Alias { get; set; }
    }
}
