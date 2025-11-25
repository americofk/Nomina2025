using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeDepartment
    {
        public string EmployeeId { get; set; }
        public string DepartmentId { get; set; }
        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        public bool EmployeeDepartmentStatus { get; set; }
        public string Comment { get; set; }

    }
}
