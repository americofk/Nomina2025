/// <summary>
/// Modelo de solicitud para CoursePosition.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CoursePositons
{
    /// <summary>
    /// Modelo de solicitud para CoursePosition.
    /// </summary>
    public class CoursePositionRequest: GenericValidation<CoursePositionRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CourseId), "El curso no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PositionId), "La posición no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
