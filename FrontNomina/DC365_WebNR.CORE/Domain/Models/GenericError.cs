/// <summary>
/// Modelo de datos genérico para manejo de errores.
/// Proporciona una propiedad base para mensajes de error en otros modelos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de GenericError.
    /// </summary>
    public class GenericError
    {
        /// <summary>
        /// Lista de errores.
        /// </summary>
        public string Error { get; set; }
    }
}
