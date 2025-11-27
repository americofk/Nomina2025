/// <summary>
/// Modelo de solicitud para CalendarHoliday.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CalendarHolidays
{
    /// <summary>
    /// Modelo de solicitud para CalendarHoliday.
    /// </summary>
    public class CalendarHolidayRequest : GenericValidation<CalendarHolidayRequest>, IValidatableObject
    {
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalendarDate { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => x.CalendarDate == default, "La fecha de calendario no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
