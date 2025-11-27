/// <summary>
/// Modelo de solicitud para verificación de EmployeeHistoryDGT.
/// Define los parámetros necesarios para validar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories
{
    /// <summary>
    /// Modelo de solicitud para EmployeeHistoryIsForDGT.
    /// </summary>
    public class EmployeeHistoryIsForDGTRequest: GenericValidation<EmployeeHistoryIsForDGTRequest>,IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsUseDGT { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeHistoryId), "El código de historial no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
