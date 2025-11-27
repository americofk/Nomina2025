/// <summary>
/// Modelo de solicitud para actualización de EmployeeLoan.
/// Define los parámetros necesarios para actualizar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeLoans
{
    /// <summary>
    /// Clase para gestion de EmployeeLoanRequestUpdate.
    /// </summary>
    public class EmployeeLoanRequestUpdate : GenericValidation<EmployeeLoanRequestUpdate>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string LoanId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.LoanId), "El código de préstamo no puede estar vacío"),
                //ForRule(this, x => x.ValidFrom == default, "La fecha desde no puede estar vacía"),
                ForRule(this, x => x.ValidTo == default, "La fecha hasta no puede estar vacía"),
                //ForRule(this, x => x.ValidTo < x.ValidFrom, "La fecha hasta no puede ser menor que la fecha desde"),
                ForRule(this, x => x.LoanAmount < 0, "El monto del préstamo no puede ser cero"),
                ForRule(this, x => x.TotalDues < 0, "La cantidad de cuotas no puede ser cero"),
                ForRule(this, x => x.AmountByDues < 0, "El monto de las cuotas no puede ser cero"),
                ForRule(this, x => x.QtyPeriodForPaid == 0, "La cantidad de períodos no puede ser 0")
            };

            return validationResults;
        }
    }
}
