/// <summary>
/// Entidad de dominio para GeneralConfig.
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
    /// Clase para gestion de GeneralConfig.
    /// </summary>
    public class GeneralConfig : AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador unico.
        /// </summary>
        public int Id { get; set; }
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
