/// <summary>
/// Entidad de dominio para FileUpload.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    /// <summary>
    /// Clase para gestion de FileUpload.
    /// </summary>
    public class FileUpload
    {
        /// <summary>
        /// Imagen.
        /// </summary>
        public byte[] Image { get; set; }
        /// <summary>
        /// Valor de texto para Extension.
        /// </summary>
        public string Extension { get; set; }
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
    }
}
