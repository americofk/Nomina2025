using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeePositionStatusRequest
    {
        public string EmployeeId { get; set; }
        public string PositionId { get; set; }
        public DateTime ToDate { get; set; }
    }
}
