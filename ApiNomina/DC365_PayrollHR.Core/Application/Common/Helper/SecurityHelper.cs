/// <summary>
/// Helper para Security.
/// Provee funciones auxiliares para operaciones comunes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    /// <summary>
    /// Clase auxiliar para Security.
    /// </summary>
    public class SecurityHelper
    {
        /// <summary>
        /// Ejecuta la operacion MD5.
        /// </summary>
        /// <param name="word">Parametro word.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static string MD5(string word)
        {
            MD5 md5 = MD5CryptoServiceProvider.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = md5.ComputeHash(encoding.GetBytes(word));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
    }
}
