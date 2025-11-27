/// <summary>
/// Modelo de solicitud para EmployeePosition.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions
{
    /// <summary>
    /// Modelo de solicitud para EmployeePosition.
    /// </summary>
    public class EmployeePositionRequest: GenericValidation<EmployeePositionRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        private string CallerName;

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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PositionId), "La posición no puede estar vacía"),
                ForRule(this, x => x.FromDate == default, "La fecha desde no puede estar vacía"),
                ForRule(this, x => x.ToDate == default, "La fecha hasta no puede estar vacía"),
                ForRule(this, x => x.ToDate < x.FromDate, "La fecha hasta no puede ser menor que la fecha desde")
            };

            return validationResults;
        }

        /// <summary>

        /// Ejecuta la operacion SetCallerName.

        /// </summary>

        /// <param name="_CallerName">Parametro _CallerName.</param>

        public void SetCallerName(string _CallerName)
        {
            CallerName = _CallerName;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        public string GetCallerName()
        {
            return CallerName;
        }
    }
}
