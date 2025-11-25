using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeWorkControlCalendarResponse: GenericError
    {
        public string EmployeeId
        {
            get
            {
                return EmployeeIdWorkCalendar;
            }
        }
        public string EmployeeIdWorkCalendar { get; set; }
        public int InternalId { get; set; }
        [DataType(DataType.Date)]

        public DateTime CalendarDate { get; set; }
        public string CalendarDay { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan WorkFrom { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan WorkTo { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan BreakWorkFrom { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan BreakWorkTo { get; set; }
        public decimal TotalHour { get; set; }
        public StatusWorkControl StatusExtraHour { get; set; }
    }
}
