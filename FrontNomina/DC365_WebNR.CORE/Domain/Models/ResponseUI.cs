/// <summary>
/// Modelo de respuesta genérico para la interfaz de usuario.
/// Proporciona una estructura estandarizada para retornar mensajes y datos a la UI.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de ResponseUI.
    /// </summary>
    public class ResponseUI<T>
    {
        /// <summary>
        /// Mensaje.
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Obtiene o establece Obj.
        /// </summary>
        public T Obj { get; set; }
        public List<string>Errors { get; set; }
    }

    /// <summary>

    /// Clase para gestion de ResponseUI.

    /// </summary>

    public class ResponseUI
    {
        /// <summary>
        /// Mensaje.
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Lista de errores.
        /// </summary>
        public List<string> Errors { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string IdType { get; set; }
    }
}
    
