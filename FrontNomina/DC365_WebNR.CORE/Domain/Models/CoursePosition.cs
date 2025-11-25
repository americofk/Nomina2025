using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class CoursePosition
    {
        public string CourseId
        {
            get
            {
                return CoursePositionId;
            }
        }
        public string CoursePositionId { get; set; }
        public string PositionId { get; set; }
        [Required(ErrorMessage = "Comentario" + ErrorMsg.Emptym)]
        public string Comment { get; set; }
        public string PositionName { get; set; }
        public string DepartmentName { get; set; }
    }
}
