using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{

    public class EmployeeBatch : Employee
    {
        public string PositionId { get; set; }
        public DateTime PositionFromDate { get; set; }
        public DateTime PositionToDate { get; set; }

    }
}
