using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class Department
    {
        [CustomFilter("Id Departamento")]
        public string DepartmentId { get; set; }

        [MaxLength(50)]
        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Número de trabajadores" + ErrorMsg.Emptyf)]
        public int QtyWorkers { get; set; }

        [CustomFilter("Fecha inicio")]
        [Required(ErrorMessage = "Fecha de inicio" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Fecha de fin" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }        
    }
}
