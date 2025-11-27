/// <summary>
/// Modelo de respuesta para .
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model
{
    public class Response <T>
    {
        public Response()
        {
        }
        public Response(T data)
        {
            StatusHttp = 200;
            Succeeded = true;
            Message = string.Empty;
            Errors = null;
            Data = data;
        }
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
        public IEnumerable<string> Errors { get; set; }
        /// <summary>
        /// Mensaje.
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Valor numerico para StatusHttp.
        /// </summary>
        public int StatusHttp { get; set; }

    }
}
