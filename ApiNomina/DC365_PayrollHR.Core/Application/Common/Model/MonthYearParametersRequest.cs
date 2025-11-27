/// <summary>
/// Modelo de solicitud para MonthYearParameters.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model
{
    /// <summary>
    /// Modelo de solicitud para MonthYearParameters.
    /// </summary>
    public class MonthYearParametersRequest: GenericValidation<MonthYearParametersRequest>, IValidatableObject
    {
        /// <summary>
        /// Valor numerico para Month.
        /// </summary>
        [Required]
        public int Month { get; set; }

        /// <summary>

        /// Valor numerico para Year.

        /// </summary>

        [Required]
        public int Year { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => x.Month < 1 || x.Month > 12, "El mes no es válido"),
                ForRule(this, x => x.Year < 1000 || x.Year > 9999, "El año no es válido")
            };

            return validationResults;
        }
    }
}
