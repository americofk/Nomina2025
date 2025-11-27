/// <summary>
/// Entidad de dominio para CompaniesAssignedToUser.
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
    /// Clase para gestion de CompaniesAssignedToUser.
    /// </summary>
    public class CompaniesAssignedToUser : AuditableEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyId { get; set; }
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
    }
}
