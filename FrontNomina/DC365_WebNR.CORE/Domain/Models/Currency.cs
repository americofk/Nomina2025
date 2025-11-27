/// <summary>
/// Modelo de datos para representar monedas.
/// Define las diferentes divisas utilizadas en el sistema de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Currency.
    /// </summary>
    public class Currency
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CurrencyId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
    }
}
