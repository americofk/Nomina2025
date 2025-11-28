/// <summary>
/// Modelo de datos para representar cargos o funciones laborales.
/// Define las diferentes responsabilidades y roles dentro de la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Cargo
    /// </summary>
    public class Job : AuditableCompanyModel
    {
        /// <summary>
        /// Automatico
        /// </summary>
        [CustomFilter("Id Cargo")]
        public string JobId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }
        /// <summary>
        /// Max 200
        /// </summary>
        [MaxLength(200)]
        [Required(ErrorMessage = "Descripci�n" + ErrorMsg.Emptym)]
        [CustomFilter("Descripci�n")]
        public string Description { get; set; }

        public bool JobStatus { get; set; } = true;

    }


}
