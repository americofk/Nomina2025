/// <summary>
/// Modelo de solicitud para BatchEmployeeWorkControlCalendar.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Batchs
{
    /// <summary>
    /// Modelo de solicitud para BatchEmployeeWorkControlCalendar.
    /// </summary>
    public class BatchEmployeeWorkControlCalendarRequest: GenericValidation<BatchEmployeeWorkControlCalendarRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalendarDate { get; set; }

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

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeId), "El empleado no puede estar vacío"),
                ForRule(this, x => x.CalendarDate == default, "La fecha del calendario no puede estar vacía"),
                ForRule(this, x => x.WorkFrom > x.WorkTo, "La hora final no puede ser menor que la hora inicial"),
                ForRule(this, x => x.BreakWorkFrom > x.BreakWorkTo, "La hora de descanso final no puede ser menor que la hora de descanso inicial")
            };

            return validationResults;
        }
    }
}
