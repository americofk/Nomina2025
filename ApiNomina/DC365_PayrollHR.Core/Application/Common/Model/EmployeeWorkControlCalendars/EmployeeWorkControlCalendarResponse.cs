using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkControlCalendars
{
    public class EmployeeWorkControlCalendarResponse
    {
        public int InternalId { get; set; }
        public string EmployeeId { get; set; }
        public DateTime CalendarDate { get; set; }
        public string CalendarDay { get; set; }
        public TimeSpan WorkFrom { get; set; }
        public TimeSpan WorkTo { get; set; }
        public TimeSpan BreakWorkFrom { get; set; }
        public TimeSpan BreakWorkTo { get; set; }
        public decimal TotalHour { get; set; }
        public StatusWorkControl StatusWorkControl { get; set; }
    }
}
