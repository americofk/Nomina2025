using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeContactInfoBatch
    {
        public string NumberAddress { get; set; }
        public bool IsPrincipal { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public ContactType ContactType { get; set; }
    }
}
