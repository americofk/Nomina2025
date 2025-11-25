using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Domain.Models.Enums;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class HireEmployee
    {
        public string EmployeeId { get; set; }
        public string PositionId { get; set; }
        [DataType(DataType.Date)]

        public DateTime FromDate { get; set; }
        [DataType(DataType.Date)]

        public DateTime ToDate { get; set; }
        public string Comment { get; set; }
        public EmployeeAction EmployeeAction { get; set; }
    }
}
