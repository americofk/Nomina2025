using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions
{
    public class EmployeePositionResponse
    {
        public string EmployeeId { get; set; }
        public string PositionId { get; set; }
        public string PositionName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Comment { get; set; }
        public bool EmployeePositionStatus { get; set; }
    }
}
