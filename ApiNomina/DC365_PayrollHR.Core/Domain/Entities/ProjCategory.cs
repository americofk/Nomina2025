using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class ProjCategory: AuditableCompanyEntity
    {
        public string ProjCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string LedgerAccount { get; set; }
        public bool ProjCategoryStatus { get; set; } = true;
    }
}
