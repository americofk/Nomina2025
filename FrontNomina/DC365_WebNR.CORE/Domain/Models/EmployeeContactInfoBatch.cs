/// <summary>
/// Modelo para procesamiento por lotes de información de contacto de empleados.
/// Permite importar o actualizar múltiples contactos de empleados de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeContactInfoBatch.
    /// </summary>
    public class EmployeeContactInfoBatch
    {
        /// <summary>
        /// Direccion.
        /// </summary>
        public string NumberAddress { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public ContactType ContactType { get; set; }
    }
}
