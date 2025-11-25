using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CourseEmployees
{
    public class CourseEmployeeResponse
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string CourseId { get; set; }
        public string CourseName { get; set; }
        public string DepartmentName { get; set; }
        public string Comment { get; set; }
    }
}
