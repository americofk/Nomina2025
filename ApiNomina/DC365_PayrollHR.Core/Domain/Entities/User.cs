/// <summary>
/// Entidad de dominio para User.
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
    /// Clase para gestion de User.
    /// </summary>
    public class User: AuditableEntity
    {
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Contrasena.
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string FormatCodeId { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public AdminType ElevationType { get; set; } = AdminType.Usuario;
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyDefaultId { get; set; }
        /// <summary>
        /// Contrasena.
        /// </summary>
        public string TemporaryPassword { get; set; }
        /// <summary>
        /// Contrasena.
        /// </summary>
        public DateTime DateTemporaryPassword { get; set; }

    }
}
