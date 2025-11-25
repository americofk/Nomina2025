using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class CourseEmployees
    {
        public string CourseId
        {
            get
            {
                return CourseIdEmployeeId;
            }
        }
        public string EmployeeId { get; set; }
        [Required(ErrorMessage = "Comentario" + ErrorMsg.Emptym)]
        public string Comment { get; set; }
        public string CourseIdEmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string DepartmentName { get; set; }
       
       
    }
}
