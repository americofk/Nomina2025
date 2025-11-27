/// <summary>
/// Modelo de solicitud para ValidatePrivilege.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model
{
    /// <summary>
    /// Modelo de solicitud para ValidatePrivilege.
    /// </summary>
    public class ValidatePrivilegeRequest
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
        /// <summary>
        /// Tipo.
        /// </summary>
        public AdminType ElevationType { get; set; }
    }
}
