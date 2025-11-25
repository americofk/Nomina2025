using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeWorkCalendar: GenericError
    {
        public string EmployeeId
        {
            get
            {
                return EmployeeIdWorkCalendar;
            }
        }
        public string EmployeeIdWorkCalendar { get; set; }
        [DataType(DataType.Date)]
        public DateTime CalendarDate { get; set; }
        public string CalendarDay { get; set; }
        public int InternalId { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan WorkFrom { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan WorkTo { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan BreakWorkFrom { get; set; }
        [DataType(DataType.Time)]
        public TimeSpan BreakWorkTo { get; set; }
    }

    //public class EmployeeWorkCalendarRequest
    //{
    //    public string EmployeeId { get; set; }
    //    public DateTime CalendarDate { get; set; }

    //    public TimeSpan WorkFrom { get; set; }
    //    public TimeSpan WorkTo { get; set; }
    //    public TimeSpan BreakWorkFrom { get; set; }
    //    public TimeSpan BreakWorkTo { get; set; }
    //}
}
