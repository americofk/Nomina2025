/// <summary>
/// Entidad de dominio para Project.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de Project.
    /// </summary>
    public class Project: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProjId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public bool ProjStatus { get; set; } = true;
    }
}
