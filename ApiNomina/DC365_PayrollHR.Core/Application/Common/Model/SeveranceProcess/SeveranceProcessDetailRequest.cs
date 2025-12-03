/// <summary>
/// Modelo de solicitud para SeveranceProcessDetail.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.SeveranceProcess
{
    /// <summary>
    /// Modelo de solicitud para crear/actualizar un detalle de prestaciones.
    /// </summary>
    public class SeveranceProcessDetailRequest : GenericValidation<SeveranceProcessDetailRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador del proceso de prestaciones.
        /// </summary>
        public string SeveranceProcessId { get; set; }

        /// <summary>
        /// Identificador del empleado.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>
        /// Fecha final de empleo.
        /// </summary>
        public DateTime EndWorkDate { get; set; }

        /// <summary>
        /// Tipo de cálculo de prestaciones.
        /// </summary>
        public SeveranceCalculationType CalculationType { get; set; }

        /// <summary>
        /// Indica si el empleado fue preavisado.
        /// </summary>
        public bool WasNotified { get; set; }

        /// <summary>
        /// Indica si se debe incluir cesantía.
        /// </summary>
        public bool IncludeCesantia { get; set; } = true;

        /// <summary>
        /// Indica si el empleado tomó vacaciones.
        /// </summary>
        public bool TookVacations { get; set; }

        /// <summary>
        /// Días de vacaciones disponibles (si se sobrescribe el cálculo).
        /// </summary>
        public int? DiasVacacionesOverride { get; set; }

        /// <summary>
        /// Indica si se debe incluir salario de navidad.
        /// </summary>
        public bool IncludeNavidad { get; set; } = true;

        /// <summary>
        /// Comentarios adicionales.
        /// </summary>
        public string Comments { get; set; }

        /// <summary>
        /// Valida los datos del modelo.
        /// </summary>
        /// <param name="validationContext">Parametro validationContext.</param>
        /// <returns>Resultado de la validación.</returns>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.SeveranceProcessId), "El proceso de prestaciones es requerido"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeId), "El empleado es requerido"),
                ForRule(this, x => x.EndWorkDate == default, "La fecha final de empleo es requerida")
            };

            return validationResults;
        }
    }
}
