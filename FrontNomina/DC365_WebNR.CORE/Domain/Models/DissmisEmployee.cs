using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class DissmisEmployee
    {
        public string EmployeeId { get; set; }
        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        public EmployeeAction EmployeeAction { get; set; }
    }
}
