using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class GeneralConfig
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string SMTP { get; set; }
        public string SMTPPort { get; set; }
        public string EmailPassword { get; set; }
    }
}
