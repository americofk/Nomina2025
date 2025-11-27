/// <summary>
/// Modelo de datos para representar códigos de formato.
/// Define los formatos utilizados en el sistema para estandarizar datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de FormatCode.
    /// </summary>
    public class FormatCode
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string FormatCodeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
    }
}
