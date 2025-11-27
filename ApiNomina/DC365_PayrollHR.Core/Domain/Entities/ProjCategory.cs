/// <summary>
/// Entidad de dominio para ProjCategory.
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
    /// Clase para gestion de ProjCategory.
    /// </summary>
    public class ProjCategory: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjCategoryId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string CategoryName { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public bool ProjCategoryStatus { get; set; } = true;
    }
}
