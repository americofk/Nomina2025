/// <summary>
/// Modelo de solicitud para verificación de PayCycleTss.
/// Define los parámetros necesarios para validar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.PayCycles
{
    /// <summary>
    /// Modelo de solicitud para PayCycleIsForTss.
    /// </summary>
    public class PayCycleIsForTssRequest: GenericValidation<PayCycleIsForTssRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public int PayCycleId { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTss { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), "La nómina no puede estar vacía"),
                ForRule(this, x => x.PayCycleId == 0, "El ciclo de pago no puede estar vacío")
            };

            return validationResults;
        }
    }
}
