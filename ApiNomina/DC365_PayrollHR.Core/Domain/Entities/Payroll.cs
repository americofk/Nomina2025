/// <summary>
/// Entidad de dominio para Payroll.
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
    /// Clase para gestion de Payroll.
    /// </summary>
    public class Payroll : AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Obtiene o establece PayFrecuency.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsRoyaltyPayroll { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string CurrencyId { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public bool PayrollStatus { get; set; } = true;

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsForHourPayroll { get; set; }


        /// <summary>


        /// Valor numerico para BankSecuence.


        /// </summary>


        public int BankSecuence { get; set; }
    }
}
