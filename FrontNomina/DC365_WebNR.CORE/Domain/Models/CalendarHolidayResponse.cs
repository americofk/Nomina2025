using DC365_WebNR.CORE.Aplication.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class CalendarHolidayResponse
    {
        [CustomFilter("Fecha")]
        [DataType(DataType.Date)]
        public DateTime CalendarDate { get; set; }
        [CustomFilter("Descripción")]
        public string Description { get; set; }
    }
}
