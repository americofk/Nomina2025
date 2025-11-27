/// <summary>
/// Modelo de respuesta para EmployeeExtraHour.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeExtraHours
{
    /// <summary>
    /// Modelo de respuesta para EmployeeExtraHour.
    /// </summary>
    public class EmployeeExtraHourResponse
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
        /// Monto.
        /// </summary>
        public decimal Amount { get; set; }
        /// <summary>
        /// Valor numerico para Indice.
        /// </summary>
        public decimal Indice { get; set; }
        /// <summary>
        /// Valor numerico para Quantity.
        /// </summary>
        public decimal Quantity { get; set; }
        /// <summary>
        /// Obtiene o establece StatusExtraHour.
        /// </summary>
        public StatusExtraHour StatusExtraHour { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PayrollName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EarningCodeName { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime CalcPayrollDate { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
    }
}
