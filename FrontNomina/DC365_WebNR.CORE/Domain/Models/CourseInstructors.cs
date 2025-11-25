using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class CourseInstructors
    {
        public string InstructorId { get; set; }
        [Required(ErrorMessage = "Comentario" + ErrorMsg.Emptym)]
        public string Comment { get; set; }
        public string CourseIdInstructor { get; set; }

        public string CourseName { get; set; }
        public string InstructorName { get; set; }
        public string CourseId
        {
            get
            {
                return CourseIdInstructor;
            }
        }
    }
}
