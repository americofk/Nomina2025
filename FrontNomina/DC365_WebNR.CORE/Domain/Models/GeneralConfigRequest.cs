/// <summary>
/// Modelo de solicitud para configuración general del sistema.
/// Define los parámetros de configuración como email y servidor SMTP.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para GeneralConfig.
    /// </summary>
    public class GeneralConfigRequest
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
        /// Contrasena.
        /// </summary>
        public string EmailPassword { get; set; }
    }
}
