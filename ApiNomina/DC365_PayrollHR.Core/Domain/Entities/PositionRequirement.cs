using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class PositionRequirement: AuditableCompanyEntity
    {
        public string Name { get; set; }
        public string Detail { get; set; }
        public string PositionId { get; set; }
    }
}
