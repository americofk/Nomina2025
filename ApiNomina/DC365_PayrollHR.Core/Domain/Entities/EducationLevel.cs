using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class EducationLevel : AuditableEntity
    {
        public string EducationLevelId { get; set; }
        public string Description { get; set; }
    }
}
