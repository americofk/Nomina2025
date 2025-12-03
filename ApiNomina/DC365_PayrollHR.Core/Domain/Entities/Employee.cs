/// <summary>
/// Entidad de dominio para Employee.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de Employee.
    /// </summary>
    public class Employee: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Max 50
        /// </summary>
        public string PersonalTreatment { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public DateTime BirthDate { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public Gender Gender { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public int Age { get; set; }

        /// <summary>

        /// Valor numerico para DependentsNumbers.

        /// </summary>

        public int DependentsNumbers { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        public MaritalStatus MaritalStatus { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string NSS { get; set; } = "N/A";
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string ARS { get; set; } = "N/A";
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string AFP { get; set; } = "N/A";

        /// <summary>

        /// Fecha.

        /// </summary>

        public DateTime AdmissionDate { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Required
        /// </summary>
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

        /// Obtiene o establece WorkFrom.

        /// </summary>

        public TimeSpan WorkFrom { get; set; }
        /// <summary>
        /// Obtiene o establece WorkTo.
        /// </summary>
        public TimeSpan WorkTo { get; set; }
        /// <summary>
        /// Obtiene o establece BreakWorkFrom.
        /// </summary>
        public TimeSpan BreakWorkFrom { get; set; }
        /// <summary>
        /// Obtiene o establece BreakWorkTo.
        /// </summary>
        public TimeSpan BreakWorkTo { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public bool EmployeeStatus { get; set; } = true;
        /// <summary>
        /// Estado.
        /// </summary>
        public WorkStatus WorkStatus { get; set; } = WorkStatus.Candidato;


        /// <summary>


        /// Fecha.


        /// </summary>


        public DateTime StartWorkDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime EndWorkDate { get; set; }
        /// <summary>
        /// Obtiene o establece PayMethod.
        /// </summary>
        public PayMethod PayMethod { get; set; }


        /// <summary>


        /// Empleado.


        /// </summary>


        public EmployeeAction EmployeeAction { get; set; } = EmployeeAction.Ninguno;

        /// <summary>

        /// Indica el estado de ApplyforOvertime.

        /// </summary>

        public bool ApplyforOvertime { get; set; }

        //Aditional field informative
        /// <summary>
        /// Identificador.
        /// </summary>
        public string OccupationId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
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
        public string LocationId { get; set; }

        //Actualización para horario fijo 
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsFixedWorkCalendar { get; set; }
    }
}
