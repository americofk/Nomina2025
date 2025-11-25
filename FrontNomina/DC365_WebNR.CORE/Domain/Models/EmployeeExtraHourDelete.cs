using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeExtraHourDelete
    {
        public string EarningCodeId { get; set; }
        [DataType(DataType.Date)]
        public DateTime WorkedDay { get; set; }
    }
}
