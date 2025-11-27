/// <summary>
/// Modelo de datos para representar opciones de usuario.
/// Contiene las preferencias y configuraciones personalizadas del usuario.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de UserOptions.
    /// </summary>
    public class UserOptions
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string FormatCodeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyDefaultId { get; set; }
    }
}
