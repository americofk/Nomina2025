/// <summary>
/// Modelo de respuesta para User.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    /// <summary>
    /// Modelo de respuesta para User.
    /// </summary>
    public class UserResponse
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
        public AdminType ElevationType { get; set; } 
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyDefaultId { get; set; }
    }
}
