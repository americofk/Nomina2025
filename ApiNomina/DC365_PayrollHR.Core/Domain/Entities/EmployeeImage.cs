/// <summary>
/// Entidad de dominio para EmployeeImage.
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
    /// Clase para gestion de EmployeeImage.
    /// </summary>
    public class EmployeeImage: AuditableCompanyEntity
    {
        /// <summary>
        /// Imagen.
        /// </summary>
        public byte[] Image { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Valor de texto para Extension.
        /// </summary>
        public string Extension { get; set; }
    }
}
