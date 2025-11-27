/// <summary>
/// Entidad de dominio para MenuAssignedToUser.
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
    /// Clase para gestion de MenuAssignedToUser.
    /// </summary>
    public class MenuAssignedToUser: AuditableEntity
    {
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string MenuId { get; set; }
        /// <summary>
        /// Indica el estado de PrivilegeView.
        /// </summary>
        public bool PrivilegeView { get; set; } = true;
        /// <summary>
        /// Indica el estado de PrivilegeEdit.
        /// </summary>
        public bool PrivilegeEdit { get; set; } = false;
        /// <summary>
        /// Indica el estado de PrivilegeDelete.
        /// </summary>
        public bool PrivilegeDelete { get; set; } = false;
    }
}
