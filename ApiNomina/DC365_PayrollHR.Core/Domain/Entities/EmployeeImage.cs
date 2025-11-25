using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EmployeeImage: AuditableCompanyEntity
    {
        public byte[] Image { get; set; }
        public string EmployeeId { get; set; }
        public string Extension { get; set; }
    }
}
