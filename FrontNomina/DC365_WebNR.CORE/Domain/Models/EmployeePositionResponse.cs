using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeePositionResponse: GenericError
    {
        public string PositionId { get; set; }
        public string PositionName { get; set; }

        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        public bool EmployeePositionStatus { get; set; }
        public string Comment { get; set; }
        public string EmployeeIdPosition { get; set; }
        public string EmployeeId
        {
            get
            {
                return EmployeeIdPosition;
            }
        }
    }
}
