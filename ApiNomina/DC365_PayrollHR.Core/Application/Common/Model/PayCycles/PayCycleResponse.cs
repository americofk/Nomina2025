/// <summary>
/// Modelo de respuesta para PayCycle.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.PayCycles
{
    /// <summary>
    /// Modelo de respuesta para PayCycle.
    /// </summary>
    public class PayCycleResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int PayCycleId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PeriodStartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PeriodEndDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime DefaultPayDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PayDate { get; set; }
        /// <summary>
        /// Valor numerico para AmountPaidPerPeriod.
        /// </summary>
        public decimal AmountPaidPerPeriod { get; set; }
        /// <summary>
        /// Obtiene o establece StatusPeriod.
        /// </summary>
        public StatusPeriod StatusPeriod { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string PayrollId { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTax { get; set; }

        /// <summary>

        /// Obtiene o establece PayFrecuency.

        /// </summary>

        public PayFrecuency PayFrecuency { get; set; }
        //Modificación para calcular el tss
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTss { get; set; }
    }
}
