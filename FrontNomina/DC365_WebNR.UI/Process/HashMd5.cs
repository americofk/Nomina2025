/// <summary>
/// Helper para generación de hash MD5.
/// Proporciona funcionalidad para crear hashes MD5 de cadenas de texto.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Process
{
    /// <summary>
    /// Clase para gestion de HashMd5.
    /// </summary>
    public class HashMd5
    {
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="str">Parametro str.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static string GetMD5(string str)
        {
            var md5 = MD5.Create();
            var encoding = new ASCIIEncoding();
            byte[] stream = null;
            var sb = new StringBuilder();
            stream = md5.ComputeHash(encoding.GetBytes(str));
            foreach (byte t in stream)
            {
                sb.AppendFormat("{0:x2}", t);
            }
            return sb.ToString();
        }
    }
}
