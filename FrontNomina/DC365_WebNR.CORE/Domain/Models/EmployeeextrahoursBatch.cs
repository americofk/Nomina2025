/// <summary>
/// Modelo para procesamiento por lotes de horas extras de empleados.
/// Permite importar o actualizar múltiples registros de horas extras de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeextrahoursBatch.
    /// </summary>
    public class EmployeeextrahoursBatch
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
    }
}
