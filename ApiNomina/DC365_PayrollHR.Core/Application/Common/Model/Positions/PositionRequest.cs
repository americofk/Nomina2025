/// <summary>
/// Modelo de solicitud para Position.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Positions
{
    /// <summary>
    /// Modelo de solicitud para Position.
    /// </summary>
    public class PositionRequest : GenericValidation<PositionRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string JobId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string NotifyPositionId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime EndDate { get; set; }
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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PositionName), "El nombre no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.DepartmentId), "El departamento no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.JobId), "El cargo no puede estar vacío"),
                ForRule(this, x => x.StartDate == default, "La fecha inicial no puede estar vacía"),
                ForRule(this, x => x.EndDate == default, "La fecha final no puede estar vacía"),
                ForRule(this, x => x.EndDate < x.StartDate, "La fecha final no puede ser menor que la fecha inicial")
            };

            return validationResults;
        }
    }
}
