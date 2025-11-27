/// <summary>
/// Helper para AppSettings.
/// Provee funciones auxiliares para operaciones comunes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    /// <summary>
    /// Clase para gestion de AppSettings.
    /// </summary>
    public class AppSettings
    {
        /// <summary>
        /// Valor de texto para Secret.
        /// </summary>
        public string Secret { get; set; }
        /// <summary>
        /// Valor de texto para SecretConfig.
        /// </summary>
        public string SecretConfig { get; set; }
    }
}
