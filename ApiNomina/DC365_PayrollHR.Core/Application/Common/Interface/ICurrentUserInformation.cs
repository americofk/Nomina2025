/// <summary>
/// Interfaz para CurrentUserInformation.
/// Define el contrato de operaciones disponibles.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    /// <summary>
    /// Interfaz para ICurrentUserInformation.
    /// </summary>
    public interface ICurrentUserInformation
    {
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; }
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ElevationType { get; }
        /// <summary>
        /// Empresa.
        /// </summary>
        public string Company { get; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsLicenseValid { get; }
    }
}
