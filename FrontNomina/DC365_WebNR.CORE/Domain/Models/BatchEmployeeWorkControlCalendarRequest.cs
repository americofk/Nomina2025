using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class BatchEmployeeWorkControlCalendarRequest
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime CalendarDate { get; set; }

        public TimeSpan WorkFrom { get; set; }
        public TimeSpan WorkTo { get; set; }
        public TimeSpan BreakWorkFrom { get; set; }
        public TimeSpan BreakWorkTo { get; set; }
    }
}
