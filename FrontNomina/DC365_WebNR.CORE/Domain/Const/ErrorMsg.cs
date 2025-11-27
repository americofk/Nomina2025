/// <summary>
/// Clase de constantes para mensajes de error.
/// Define mensajes estándar de error y validación utilizados en toda la aplicación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Const
{
    /// <summary>
    /// Clase para gestion de ErrorMsg.
    /// </summary>
    public static class ErrorMsg
    {
        public const string Email = "Formato de correo inválido";
        public const string Emptym = " no puede estar vacío";
        public const string Emptyf = " no puede estar vacía";
        public const string Error500 = "Ocurrió un error procesando la solicitud, inténtelo más tarde o contacte con el administrador.";
        public const string TypeError = "error";
        public const string TypeOk = "success";
        public const string Empty0 = "no puede ser 0";
    }
}
