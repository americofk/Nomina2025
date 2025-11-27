/// <summary>
/// Modelo de respuesta para GeneralConfig.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.GeneralConfigs
{
    /// <summary>
    /// Modelo de respuesta para GeneralConfig.
    /// </summary>
    public class GeneralConfigResponse
    {
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Valor de texto para SMTP.
        /// </summary>
        public string SMTP { get; set; }
        /// <summary>
        /// Valor de texto para SMTPPort.
        /// </summary>
        public string SMTPPort { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPassword { get; set; }
    }
}
