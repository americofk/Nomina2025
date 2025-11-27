/// <summary>
/// Modelo de respuesta para MenuToUser.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers
{
    /// <summary>
    /// Modelo de respuesta para MenuToUser.
    /// </summary>
    public class MenuToUserResponse
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
        public bool PrivilegeView { get; set; }
        /// <summary>
        /// Indica el estado de PrivilegeEdit.
        /// </summary>
        public bool PrivilegeEdit { get; set; } 
        /// <summary>
        /// Indica el estado de PrivilegeDelete.
        /// </summary>
        public bool PrivilegeDelete { get; set; } 
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
    }
}
