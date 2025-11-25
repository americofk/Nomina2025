using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class CourseType
    {
        public string CourseTypeId { get; set; }
        [MaxLength(50)]
        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        [MaxLength(200)]
        [CustomFilter("Descripción")]
        [Required(ErrorMessage = "La descripción" + ErrorMsg.Emptyf)]
        public string Description { get; set; }       
    }
}
