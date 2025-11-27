/// <summary>
/// Modelo de solicitud para BatchEmployee.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Batchs
{
    /// <summary>
    /// Modelo de solicitud para BatchEmployee.
    /// </summary>
    public class BatchEmployeeRequest: GenericValidation<BatchEmployeeRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Valor de texto para PersonalTreatment.
        /// </summary>
        public string PersonalTreatment { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime BirthDate { get; set; }
        /// <summary>
        /// Obtiene o establece Gender.
        /// </summary>
        public Gender Gender { get; set; }
        /// <summary>
        /// Valor numerico para Age.
        /// </summary>
        public int Age { get; set; }
        /// <summary>
        /// Valor numerico para DependentsNumbers.
        /// </summary>
        public int DependentsNumbers { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public MaritalStatus MaritalStatus { get; set; }
        /// <summary>
        /// Valor de texto para NSS.
        /// </summary>
        public string NSS { get; set; }
        /// <summary>
        /// Valor de texto para ARS.
        /// </summary>
        public string ARS { get; set; }
        /// <summary>
        /// Valor de texto para AFP.
        /// </summary>
        public string AFP { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime AdmissionDate { get; set; }
        /// <summary>
        /// Pais.
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Tipo.
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

        /// Obtiene o establece PayMethod.

        /// </summary>

        public PayMethod PayMethod { get; set; }


        //Options to add position to employee
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PositionFromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PositionToDate { get; set; }

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

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Name), "Los nombres no puede estar vacíos"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.LastName), "Los apellidos no puede estar vacíos"),
                ForRule(this, x => x.BirthDate == default, "La fecha de nacimiento no puede estar vacía"),
                ForRule(this, x => !Enum.IsDefined(typeof(Gender), x.Gender), "El género suministrado no es válido"),
                ForRule(this, x => x.Age == 0, "La edad no puede ser cero"),
                ForRule(this, x => !Enum.IsDefined(typeof(MaritalStatus), x.MaritalStatus), "El estado civil suministrado no es válido"),
                //ForRule(this, x => string.IsNullOrWhiteSpace(x.NSS), "El código NSS no puede estar vacío"),
                //ForRule(this, x => string.IsNullOrWhiteSpace(x.ARS), "El código ARS no puede estar vacío"),
                //ForRule(this, x => string.IsNullOrWhiteSpace(x.AFP), "El código AFP no puede estar vacío"),
                ForRule(this, x => x.AdmissionDate == default, "La fecha de ingreso no puede estar vacía"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Country), "El país no puede estar vacío"),
                ForRule(this, x => !Enum.IsDefined(typeof(EmployeeType), x.EmployeeType), "El tipo de empleado suministrado no es válido"),
                ForRule(this, x => x.WorkTo < x.WorkFrom, "La hora final no puede ser menor a la hora inicial"),
                ForRule(this, x => x.BreakWorkTo < x.BreakWorkFrom, "La hora final de descanso no puede ser menor a la hora inicial de descanso"),

                ForRule(this, x => !string.IsNullOrEmpty(x.PositionId) && (x.PositionFromDate == default || x.PositionToDate == default), "La fecha de inicio y fin del puesto no pueden estar vacías si se quiere crear un empleado como contratado"),

            };

            return validationResults;
        }
    }
}
