/// <summary>
/// Modelo de solicitud para EmployeeDeductionCode.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeductionCodes
{
    /// <summary>
    /// Modelo de solicitud para EmployeeDeductionCode.
    /// </summary>
    public class EmployeeDeductionCodeRequest: GenericValidation<EmployeeDeductionCodeRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DeductionCodeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Deduccion.
        /// </summary>
        public decimal IndexDeduction { get; set; }
        /// <summary>
        /// Porcentaje.
        /// </summary>
        public decimal PercentDeduction { get; set; }
        /// <summary>
        /// Porcentaje.
        /// </summary>
        public decimal PercentContribution { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal DeductionAmount { get; set; }

        //Actualización deducciones por período
        /// <summary>
        /// Valor numerico para QtyPeriodForPaid.
        /// </summary>
        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        public int StartPeriodForPaid { get; set; }

        /// <summary>

        /// Obtiene o establece PayFrecuency.

        /// </summary>

        public PayFrecuency PayFrecuency { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.DeductionCodeId), "El código de ganancia no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeId), "El empleado no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), "La nómina no puede estar vacía"),
                ForRule(this, x => x.FromDate == default, "La fecha desde no puede estar vacía"),
                ForRule(this, x => x.ToDate == default, "La fecha hasta no puede estar vacía"),
                ForRule(this, x => x.ToDate < x.FromDate, "La fecha hasta no puede ser menor que la fecha desde"),
                //ForRule(this, x => x.PercentContribution == 0, "El porcentaje de contribución no puede ser cero"),
                //ForRule(this, x => x.PercentDeduction == 0, "El porcentaje de deduction no puede ser cero"),
                //ForRule(this, x => x.Comment.Length == 200, "El tamaño máximo del comentario es 200"),
            };

            return validationResults;
        }
    }
}
