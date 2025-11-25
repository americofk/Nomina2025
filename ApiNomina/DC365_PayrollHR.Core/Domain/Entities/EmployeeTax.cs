using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EmployeeTax: AuditableCompanyEntity
    {
        public string TaxId { get; set; }
        public string EmployeeId { get; set; }
        public DateTime ValidTo { get; set; }
        public DateTime ValidFrom { get; set; }
        public string PayrollId { get; set; }
    }
}
