/// <summary>
/// Modelo de respuesta para configuración general del sistema.
/// Contiene los valores de configuración actual del sistema sin información sensible.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
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
