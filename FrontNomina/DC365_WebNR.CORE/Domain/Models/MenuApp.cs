/// <summary>
/// Modelo de datos para representar menús de la aplicación.
/// Define la estructura de navegación y opciones del sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de MenuApp.
    /// </summary>
    public class MenuApp
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string MenuName { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Valor de texto para Action.
        /// </summary>
        public string Action { get; set; }
        /// <summary>
        /// Valor de texto para Icon.
        /// </summary>
        public string Icon { get; set; }
        /// <summary>
        /// Valor de texto para MenuFather.
        /// </summary>
        public string MenuFather { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string MenuId { get; set; }
        /// <summary>
        /// Valor numerico para Sort.
        /// </summary>
        public int Sort { get; set; }
    }
}
