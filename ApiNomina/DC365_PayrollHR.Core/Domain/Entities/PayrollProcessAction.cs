/// <summary>
/// Entidad de dominio para PayrollProcessAction.
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
    /// Clase para gestion de PayrollProcessAction.
    /// </summary>
    public class PayrollProcessAction: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollProcessId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>

        /// Tipo.

        /// </summary>

        public PayrollActionType PayrollActionType { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string ActionName { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal ActionAmount { get; set; }
        /// <summary>
        /// Impuesto.
        /// </summary>
        public bool ApplyTax { get; set; }
        /// <summary>
        /// Indica el estado de ApplyTSS.
        /// </summary>
        public bool ApplyTSS { get; set; }
        /// <summary>
        /// Nomina.
        /// </summary>
        public bool ApplyRoyaltyPayroll { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string ActionId { get; set; }
    }
}
