using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class User: AuditableEntity
    {
        public string Alias { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string FormatCodeId { get; set; }
        public AdminType ElevationType { get; set; } = AdminType.User;
        public string CompanyDefaultId { get; set; }
        public string TemporaryPassword { get; set; }
        public DateTime DateTemporaryPassword { get; set; }

    }
}
