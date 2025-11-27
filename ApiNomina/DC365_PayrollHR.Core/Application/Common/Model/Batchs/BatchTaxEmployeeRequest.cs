/// <summary>
/// Modelo de solicitud para BatchTaxEmployee.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Batchs
{
    /// <summary>
    /// Modelo de solicitud para BatchTaxEmployee.
    /// </summary>
    public class BatchTaxEmployeeRequest : GenericValidation<BatchTaxEmployeeRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string TaxId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }

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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.TaxId), $"Empleado:{EmployeeName} - El impuesto no puede estar vacío"),
                ForRule(this, x => x.ValidFrom == default, $"Empleado:{EmployeeName} - La fecha desde no puede estar vacía"),
                ForRule(this, x => x.ValidTo == default, $"Empleado:{EmployeeName} - La fecha hasta no puede estar vacía"),
                ForRule(this, x => x.ValidTo < x.ValidFrom, $"Empleado:{EmployeeName} - La fecha hasta no puede ser menor que la fecha desde")
            };

            return validationResults;
        }
    }
}
