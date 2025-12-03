/// <summary>
/// Modelo de solicitud para SeveranceProcess.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.SeveranceProcess
{
    /// <summary>
    /// Modelo de solicitud para crear/actualizar un proceso de prestaciones.
    /// </summary>
    public class SeveranceProcessRequest : GenericValidation<SeveranceProcessRequest>, IValidatableObject
    {
        /// <summary>
        /// Descripción del proceso de prestaciones.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Fecha del proceso.
        /// </summary>
        public DateTime ProcessDate { get; set; }

        /// <summary>
        /// Valida los datos del modelo.
        /// </summary>
        /// <param name="validationContext">Parametro validationContext.</param>
        /// <returns>Resultado de la validación.</returns>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => x.ProcessDate == default, "La fecha del proceso no puede estar vacía")
            };

            return validationResults;
        }
    }
}
