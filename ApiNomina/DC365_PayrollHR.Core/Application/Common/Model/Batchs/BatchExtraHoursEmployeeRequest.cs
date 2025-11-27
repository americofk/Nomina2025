/// <summary>
/// Modelo de solicitud para BatchExtraHoursEmployee.
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
    /// Modelo de solicitud para BatchExtraHoursEmployee.
    /// </summary>
    public class BatchExtraHoursEmployeeRequest : GenericValidation<BatchExtraHoursEmployeeRequest>, IValidatableObject
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
        /// <summary>
        /// Valor numerico para Quantity.
        /// </summary>
        public int Quantity { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EarningCodeName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }

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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EarningCodeId), $"Empleado:{EmployeeName} - El código de ganancia no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.PayrollId), $"Empleado:{EmployeeName} - La nómina no puede estar vacía"),
                ForRule(this, x => x.Quantity == 0, $"Empleado:{EmployeeName} - La cantidad no puede estar vacía"),
                ForRule(this, x => x.StartHour == x.EndHour, $"Empleado:{EmployeeName} - La hora de entrada y salida no pueden ser la misma"),
                ForRule(this, x => x.WorkedDay == default, $"Empleado:{EmployeeName} - El día trabajado no puede estar vacío")
            };

            return validationResults;
        }
    }
}
