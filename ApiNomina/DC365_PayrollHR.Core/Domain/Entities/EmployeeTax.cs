/// <summary>
/// Entidad de dominio para EmployeeTax.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EmployeeTax.
    /// </summary>
    public class EmployeeTax: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string TaxId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollId { get; set; }
    }
}
