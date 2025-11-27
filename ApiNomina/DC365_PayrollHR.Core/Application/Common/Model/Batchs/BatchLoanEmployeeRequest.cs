/// <summary>
/// Modelo de solicitud para BatchLoanEmployee.
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
    /// Modelo de solicitud para BatchLoanEmployee.
    /// </summary>
    public class BatchLoanEmployeeRequest : GenericValidation<BatchLoanEmployeeRequest>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string LoanId { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal LoanAmount { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PaidAmount { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PendingAmount { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }

        /// <summary>

        /// Valor numerico para TotalDues.

        /// </summary>

        public int TotalDues { get; set; }
        /// <summary>
        /// Valor numerico para PendingDues.
        /// </summary>
        public int PendingDues { get; set; }
        /// <summary>
        /// Valor numerico para AmountByDues.
        /// </summary>
        public decimal AmountByDues { get; set; }

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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeId), "El empleado no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.LoanId), $"Empleado {EmployeeName} - El código de préstamo no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), $"Empleado {EmployeeName} - La nómina no puede estar vacía"),
                ForRule(this, x => x.ValidFrom == default, $"Empleado {EmployeeName} - La fecha desde no puede estar vacía"),
                ForRule(this, x => x.ValidTo == default, $"Empleado {EmployeeName} - La fecha hasta no puede estar vacía"),
                ForRule(this, x => x.ValidTo < x.ValidFrom, $"Empleado {EmployeeName} - La fecha hasta no puede ser menor que la fecha desde"),
                ForRule(this, x => x.LoanAmount < 0, $"Empleado {EmployeeName} - El monto del préstamo no puede ser cero"),
                ForRule(this, x => x.TotalDues < 0, $"Empleado {EmployeeName} - La cantidad de cuotas no puede ser cero"),
                ForRule(this, x => x.AmountByDues < 0, $"Empleado {EmployeeName} - El monto de las cuotas no puede ser cero"),
                ForRule(this, x => x.QtyPeriodForPaid == 0, $"Empleado {EmployeeName} - La cantidad de períodos no puede ser 0")
            };

            return validationResults;
        }

    }
}
