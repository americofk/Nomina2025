/// <summary>
/// Modelo de solicitud para EmployeeEarningCode.
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

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeEarningCodes
{
    /// <summary>
    /// Modelo de solicitud para EmployeeEarningCode.
    /// </summary>
    public class EmployeeEarningCodeRequest: GenericValidation<EmployeeEarningCodeRequest>, IValidatableObject
    {
        /// <summary>
        /// Valor numerico para internalid.
        /// </summary>
        public int internalid { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarning { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarningMonthly { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarningDiary { get; set; }

        /// <summary>

        /// Valor numerico para Quantity.

        /// </summary>

        public int Quantity { get; set; }
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
        /// Valor numerico para QtyPeriodForPaid.
        /// </summary>
        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        public int StartPeriodForPaid { get; set; }


        /// <summary>


        /// Indica si.


        /// </summary>


        public bool IsForDGT { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsUseCalcHour { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public decimal IndexEarningHour { get; set; }


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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeId), "El empleado no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), "La nómina no puede estar vacía"),
                ForRule(this, x => x.FromDate == default, "La fecha desde no puede estar vacía"),
                ForRule(this, x => x.ToDate == default, "La fecha hasta no puede estar vacía"),
                ForRule(this, x => x.ToDate < x.FromDate, "La fecha hasta no puede ser menor que la fecha desde"),
                ForRule(this, x => x.IndexEarning == 0, "El indice de ganancia no puede ser cero"),
                //ForRule(this, x => x.Quantity == 0, "La cantidad no puede ser cero"),
                //ForRule(this, x => x.Comment.Length > 200, "El tamaño máximo del comentario es 200"),
                ForRule(this, x => x.QtyPeriodForPaid == 0, "La cantidad de periodos para pago no puede ser 0"),
                ForRule(this, x => x.StartPeriodForPaid == 0, "El período de pago de inicio no puede ser 0")
            };

            return validationResults;
        }
    }
}
