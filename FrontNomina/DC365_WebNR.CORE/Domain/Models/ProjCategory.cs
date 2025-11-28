/// <summary>
/// Modelo de datos para representar categorías de proyectos.
/// Define las clasificaciones de proyectos para contabilidad y reportes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Common;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de ProjCategory.
    /// </summary>
    public class ProjCategory : AuditableCompanyModel
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [CustomFilter("Id Categoria")]
        public string ProjCategoryId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string CategoryName { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        [CustomFilter("Cuenta contable")]
        public string LedgerAccount { get; set; }
    }
}
