/// <summary>
/// Modelo de solicitud para EmployeeExtraHour.
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

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeExtraHours
{
    /// <summary>
    /// Modelo de solicitud para EmployeeExtraHour.
    /// </summary>
    public class EmployeeExtraHourRequest : GenericValidation<EmployeeExtraHourRequest>, IValidatableObject
    {
        /// <summary>
        /// Fecha de WorkedDay.
        /// </summary>
        public DateTime WorkedDay { get; set; }
        /// <summary>
        /// Obtiene o establece StartHour.
        /// </summary>
        public TimeSpan StartHour { get; set; }
        /// <summary>
        /// Obtiene o establece EndHour.
        /// </summary>
        public TimeSpan EndHour { get; set; }
        //public decimal Quantity { get; set; } se removió por actualización de cálculo automático
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>

        /// Valor de texto para Comment.

        /// </summary>

        public string Comment { get; set; }

        //Actualización, campo para indicar la fecha de uso de horas extra
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalcPayrollDate { get; set; }

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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EarningCodeId), "El código de ganancia no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), "La nómina no puede estar vacía"),
                //ForRule(this, x => x.Quantity == 0, "La cantidad no puede estar vacía"),
                ForRule(this, x => x.StartHour == x.EndHour, "La hora de entrada y salida no pueden ser la misma"),
                //ForRule(this, x => x.Amount > 0 , "El monto no puede estar vacío"),
                //ForRule(this, x => x.Indice > 0, "El indice no puede ser 0"),
                ForRule(this, x => x.WorkedDay == default, "El día trabajado no puede estar vacío"),

                ForRule(this, x => x.CalcPayrollDate < x.WorkedDay, "La fecha de uso para cálculo no puede ser menor a la fecha de hora extra")
            };

            return validationResults;
        }
    }
}
