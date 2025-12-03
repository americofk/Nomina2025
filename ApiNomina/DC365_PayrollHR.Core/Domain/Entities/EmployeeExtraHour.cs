/// <summary>
/// Entidad de dominio para EmployeeExtraHour.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EmployeeExtraHour.
    /// </summary>
    public class EmployeeExtraHour: AuditableCompanyEntity
    {
        /// <summary>
        /// Fecha de WorkedDay.
        /// </summary>
        public DateTime WorkedDay { get; set; }
        //public int StartHour { get; set; }
        //public int EndHour { get; set; }
        /// <summary>
        /// Obtiene o establece StartHour.
        /// </summary>
        public TimeSpan StartHour { get; set; }
        /// <summary>
        /// Obtiene o establece EndHour.
        /// </summary>
        public TimeSpan EndHour { get; set; }
        //public int TotalHour { get; set; }
        //public int TotalExtraHour { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal Amount { get; set; }
        /// <summary>
        /// Valor numerico para Indice.
        /// </summary>
        public decimal Indice { get; set; }
        //public int Quantity { get; set; }
        /// <summary>
        /// Valor numerico para Quantity.
        /// </summary>
        public decimal Quantity { get; set; }
        /// <summary>
        /// Obtiene o establece StatusExtraHour.
        /// </summary>
        public StatusExtraHour StatusExtraHour { get; set; } = StatusExtraHour.Open;
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

    }
}
