/// <summary>
/// Modelo de solicitud para BatchDeductionCodeEmployee.
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
    /// Modelo de solicitud para BatchDeductionCodeEmployee.
    /// </summary>
    public class BatchDeductionCodeEmployeeRequest : GenericValidation<BatchDeductionCodeEmployeeRequest>, IValidatableObject
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
        //public decimal IndexDeduction { get; set; }
        //public decimal PercentDeduction { get; set; }
        //public decimal PercentContribution { get; set; }
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
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal DeductionAmount { get; set; }

        /// <summary>

        /// Valor numerico para QtyPeriodForPaid.

        /// </summary>

        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        public int StartPeriodForPaid { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.DeductionCodeId), $"Employee {EmployeeName} - El código de ganancia no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeId), "El empleado no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), $"Employee {EmployeeName} - La nómina no puede estar vacía"),
                ForRule(this, x => x.FromDate == default, $"Employee {EmployeeName} - La fecha desde no puede estar vacía"),
                ForRule(this, x => x.ToDate == default, $"Employee {EmployeeName} - La fecha hasta no puede estar vacía"),
                ForRule(this, x => x.ToDate < x.FromDate, $"Employee {EmployeeName} - La fecha hasta no puede ser menor que la fecha desde"),

                ForRule(this, x => x.QtyPeriodForPaid == 0, $"Empleado {EmployeeName} - La cantidad de periodos para pago no puede ser 0"),
                ForRule(this, x => x.StartPeriodForPaid == 0, $"Empleado {EmployeeName} - El período de pago de inicio no puede ser 0")
            };

            return validationResults;
        }
    }
}
