using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.GeneralConfigs
{
    public class GeneralConfigResponse
    {
        public string Email { get; set; }
        public string SMTP { get; set; }
        public string SMTPPort { get; set; }
        public bool IsPassword { get; set; }
    }
}
