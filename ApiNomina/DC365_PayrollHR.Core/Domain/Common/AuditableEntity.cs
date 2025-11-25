using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Common
{
    public class AuditableEntity
    {
        public long RecId { get; set; }

        [MaxLength(20)]
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        [MaxLength(20)]
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

        public bool IsDeleted { get; set; } = false;

        [MaxLength(20)]
        public string? DeletedBy { get; set; }
        public DateTime? DeletedOn { get; set; }
    }
}
