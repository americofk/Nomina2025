/// <summary>
/// Entidad de dominio para EmployeeHistory.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EmployeeHistory.
    /// </summary>
    public class EmployeeHistory : AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeHistoryId { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime RegisterDate { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsUseDGT { get; set; } = true;
    }
}
