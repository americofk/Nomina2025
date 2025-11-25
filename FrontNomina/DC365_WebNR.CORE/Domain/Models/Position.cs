using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;



namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Puesto
    /// </summary>
    public class Position: IValidatableObject
    {
        /// <summary>
        /// Automatico
        /// </summary>
        [CustomFilter("Id Puesto")]
        /// 
        public string PositionId { get; set; }
        /// <summary>
        /// Reqhuired / Max 50
        /// </summary> 
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]

        public string PositionName { get; set; }

        public bool IsVacant { get; set; } = true;

        /// <summary>
        /// Required / Max 20
        /// </summary>
        //Foreign key for department
        [Required(ErrorMessage = "Departamento" + ErrorMsg.Emptym)]
        

        public string DepartmentId { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        //Foreign key for job - Cargo
        [Required(ErrorMessage = "Cargo" + ErrorMsg.Emptym)]
        public string JobId { get; set; }

        /// <summary>
        /// Max 20
        /// </summary>
        //Foreign key for job
        public string NotifyPositionId { get; set; }

        public bool PositionStatus { get; set; } = true;
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Fecha inicial" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Fecha final" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        /// <summary>
        /// Max 200
        /// </summary>
        /// 
        [CustomFilter("Descripción")]
        public string Description { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> Error = new List<ValidationResult>();
            if (StartDate >= EndDate)
            {
                Error.Add(new ValidationResult("Fecha final debe ser mayor a la fecha inicial"));
            }

            return Error;
        }
    }
}
