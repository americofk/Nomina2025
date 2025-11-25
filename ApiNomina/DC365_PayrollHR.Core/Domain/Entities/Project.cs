using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class Project: AuditableCompanyEntity
    {
        public string ProjId { get; set; }
        public string Name { get; set; }
        public string LedgerAccount { get; set; }
        public bool ProjStatus { get; set; } = true;
    }
}
