/// <summary>
/// Modelo de respuesta genérico para operaciones del sistema.
/// Proporciona una estructura estandarizada para retornar datos y mensajes de estado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de respuesta para .
    /// </summary>
    public class Response<T>
    {
        /// <summary>
        /// Datos.
        /// </summary>
        public T Data { get; set; }
        /// <summary>
        /// Indica el estado de Succeeded.
        /// </summary>
        public bool Succeeded { get; set; }
        /// <summary>
        /// Lista de errores.
        /// </summary>
        public List<string> Errors { get; set; }
        /// <summary>
        /// Mensaje.
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Valor numerico para StatusHttp.
        /// </summary>
        public int StatusHttp { get; set; }
    }
}
