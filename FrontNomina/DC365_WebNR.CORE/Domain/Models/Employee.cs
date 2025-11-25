using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class Employee
    {
        /// <summary>
        /// Automatic
        /// </summary>
        [CustomFilter("Id Empleado")]
        public string EmployeeId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        [MaxLength(50)]
        [CustomFilter("Nombre")]

        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        [MaxLength(50)]
        [CustomFilter("Apellido")]

        [Required(ErrorMessage = "Apellido" + ErrorMsg.Emptym)]
        public string LastName { get; set; }
        /// <summary>
        /// Max 50
        /// </summary>
        [MaxLength(50)]
        public string PersonalTreatment { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Fecha de nacimiento" + ErrorMsg.Emptyf)]
        [DataType(DataType.DateTime)]
        public DateTime BirthDate { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public Gender Gender { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Edad" + ErrorMsg.Emptym)]
        public int Age { get; set; }

        public int DependentsNumbers { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Estado civil" + ErrorMsg.Emptym)]
        public MaritalStatus MaritalStatus { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        [MaxLength(20)]
        [Required(ErrorMessage = "NSS" + ErrorMsg.Emptym)]
        public string NSS { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        [MaxLength(20)]
        [Required(ErrorMessage = "ARS" + ErrorMsg.Emptym)]
        public string ARS { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        [MaxLength(20)]
        [Required(ErrorMessage = "AFP" + ErrorMsg.Emptym)]
        public string AFP { get; set; }

        public DateTime AdmissionDate { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        [MaxLength(20)]
        [Required(ErrorMessage = "País de origen" + ErrorMsg.Emptym)]
        [CustomFilter("Pais")]

        public string Country { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Tipo de empleado" + ErrorMsg.Emptym)]
        public EmployeeType EmployeeType { get; set; }

        public bool HomeOffice { get; set; }
        public bool OwnCar { get; set; }
        public bool HasDisability { get; set; }
        public bool ApplyforOvertime { get; set; }
        public bool IsFixedWorkCalendar { get; set; }

        [Required(ErrorMessage = "País de origen" + ErrorMsg.Emptym)]
        [DataType(DataType.Time)]
        public TimeSpan WorkFrom { get; set; }

        [DataType(DataType.Time)]
        public TimeSpan WorkTo { get; set; }

        [DataType(DataType.Time)]
        public TimeSpan BreakWorkFrom { get; set; }

        [DataType(DataType.Time)]
        public TimeSpan BreakWorkTo { get; set; }

        public bool EmployeeStatus { get; set; } = true;

        [Display(Name ="Fecha incial empleo")]
        //[DataType(DataType.Date)]
        public DateTime StartWorkDate { get; set; }

        [Display(Name = "Fecha final empleo")]
        //[DataType(DataType.Date)]
        public DateTime EndWorkDate { get; set; }

        [Display(Name = "Método de pago")]
        public PayMethod PayMethod { get; set; }

        public WorkStatus WorkStatus { get; set; }
        public EmployeeAction EmployeeAction { get; set; }

        [Required(ErrorMessage = "Ocupación" + ErrorMsg.Emptym)]
        public string OccupationId { get; set; }
        [Required(ErrorMessage = "Nivel de educación" + ErrorMsg.Emptym)]
        public string EducationLevelId { get; set; }
        public string DisabilityTypeId { get; set; }
        public string Nationality { get; set; }
        [Required(ErrorMessage = "Localidad" + ErrorMsg.Emptyf)]

        public string LocationId { get; set; }

    }
}
