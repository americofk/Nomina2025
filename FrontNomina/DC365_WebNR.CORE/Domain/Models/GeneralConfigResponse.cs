using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class GeneralConfigResponse
    {
        public string Email { get; set; }
        public string SMTP { get; set; }
        public string SMTPPort { get; set; }
        public bool IsPassword { get; set; }
    }
}
