/// <summary>
/// Modelo de datos para representar empleados.
/// Contiene toda la información personal y laboral de los empleados de la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Employee.
    /// </summary>
    public class Employee : AuditableCompanyModel
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

        /// <summary>

        /// Valor numerico para DependentsNumbers.

        /// </summary>

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

        /// <summary>

        /// Fecha.

        /// </summary>

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

        /// <summary>

        /// Indica el estado de HomeOffice.

        /// </summary>

        public bool HomeOffice { get; set; }
        /// <summary>
        /// Indica el estado de OwnCar.
        /// </summary>
        public bool OwnCar { get; set; }
        /// <summary>
        /// Indica si tiene.
        /// </summary>
        public bool HasDisability { get; set; }
        /// <summary>
        /// Indica el estado de ApplyforOvertime.
        /// </summary>
        public bool ApplyforOvertime { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsFixedWorkCalendar { get; set; }

        /// <summary>

        /// Obtiene o establece WorkFrom.

        /// </summary>

        [Required(ErrorMessage = "País de origen" + ErrorMsg.Emptym)]
        [DataType(DataType.Time)]
        public TimeSpan WorkFrom { get; set; }

        /// <summary>

        /// Obtiene o establece WorkTo.

        /// </summary>

        [DataType(DataType.Time)]
        public TimeSpan WorkTo { get; set; }

        /// <summary>

        /// Obtiene o establece BreakWorkFrom.

        /// </summary>

        [DataType(DataType.Time)]
        public TimeSpan BreakWorkFrom { get; set; }

        /// <summary>

        /// Obtiene o establece BreakWorkTo.

        /// </summary>

        [DataType(DataType.Time)]
        public TimeSpan BreakWorkTo { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public bool EmployeeStatus { get; set; } = true;

        [Display(Name ="Fecha incial empleo")]
        //[DataType(DataType.Date)]
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartWorkDate { get; set; }

        [Display(Name = "Fecha final empleo")]
        //[DataType(DataType.Date)]
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime EndWorkDate { get; set; }

        /// <summary>

        /// Obtiene o establece PayMethod.

        /// </summary>

        [Display(Name = "Método de pago")]
        public PayMethod PayMethod { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public WorkStatus WorkStatus { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public EmployeeAction EmployeeAction { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [Required(ErrorMessage = "Ocupación" + ErrorMsg.Emptym)]
        public string OccupationId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "Nivel de educación" + ErrorMsg.Emptym)]
        public string EducationLevelId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DisabilityTypeId { get; set; }
        /// <summary>
        /// Valor de texto para Nationality.
        /// </summary>
        public string Nationality { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "Localidad" + ErrorMsg.Emptyf)]

        public string LocationId { get; set; }

    }
}
