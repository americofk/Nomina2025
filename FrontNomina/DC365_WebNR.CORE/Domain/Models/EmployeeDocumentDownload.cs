/// <summary>
/// Modelo de datos para la descarga de documentos de empleados.
/// Contiene el contenido y nombre del archivo para su descarga.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeDocumentDownload.
    /// </summary>
    public class EmployeeDocumentDownload
    {
        /// <summary>
        /// Valor de texto para Content.
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string FileName { get; set; }
    }
}
