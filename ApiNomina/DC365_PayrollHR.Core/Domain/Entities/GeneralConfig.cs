using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class GeneralConfig : AuditableCompanyEntity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string SMTP { get; set; }
        public string SMTPPort { get; set; }
        public string EmailPassword { get; set; }
    }
}
