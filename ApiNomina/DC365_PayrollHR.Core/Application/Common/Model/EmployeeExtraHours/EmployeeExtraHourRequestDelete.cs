/// <summary>
/// Modelo de solicitud para eliminación de EmployeeExtraHour.
/// Define los parámetros necesarios para eliminar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeExtraHours
{
    /// <summary>
    /// Clase para gestion de EmployeeExtraHourRequestDelete.
    /// </summary>
    public class EmployeeExtraHourRequestDelete : GenericValidation<EmployeeExtraHourRequestDelete>, IValidatableObject
    {
        /// <summary>
        /// Fecha de WorkedDay.
        /// </summary>
        public DateTime WorkedDay { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EarningCodeId), "El código de ganancia no puede estar vacío"),
                //ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), "La nómina no puede estar vacía"),
                ForRule(this, x => x.WorkedDay == default, "El día trabajado no puede estar vacío")
            };

            return validationResults;
        }
    }
}
