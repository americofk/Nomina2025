using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class Occupation : AuditableEntity
    {
        public string OccupationId { get; set; }
        public string Description { get; set; }
    }
}
