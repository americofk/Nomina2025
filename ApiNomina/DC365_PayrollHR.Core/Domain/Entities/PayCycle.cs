/// <summary>
/// Entidad de dominio para PayCycle.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de PayCycle.
    /// </summary>
    public class PayCycle: AuditableCompanyEntity
    {        
        /// <summary>
        /// Identificador.
        /// </summary>
        public int PayCycleId{ get; set; }
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

        //Modificación para calcular el tss
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsForTss { get; set; }
    }
}
