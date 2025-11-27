/// <summary>
/// Modelo de datos para representar vacantes laborales.
/// Define las posiciones disponibles y pendientes de ocupar en la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Vacants.
    /// </summary>
    public class Vacants
    {
        /// <summary>
        /// Automatico
        /// </summary>
        [CustomFilter("Id Puesto")]
        
        public string PositionId { get; set; }
        /// <summary>
        /// Reqhuired / Max 50
        /// </summary> 
        [MaxLength(50)]
        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]

        public string PositionName { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsVacant { get; set; } = true;

        /// <summary>
        /// Required / Max 20
        /// </summary>
        //Foreign key for department
        [Required(ErrorMessage = "Departamento" + ErrorMsg.Emptym)]
        public string DepartmentId { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        //Foreign key for job - Cargo
        [Required(ErrorMessage = "Cargo" + ErrorMsg.Emptym)]
        public string JobId { get; set; }

        /// <summary>
        /// Max 20
        /// </summary>
        //Foreign key for job
        public string NotifyPositionId { get; set; }

        /// <summary>

        /// Estado.

        /// </summary>

        public bool PositionStatus { get; set; } = true;
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Fecha inicial" + ErrorMsg.Emptyf)]
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Fecha final" + ErrorMsg.Emptyf)]
        public DateTime EndDate { get; set; }
        /// <summary>
        /// Max 200
        /// </summary>
        /// 
        [CustomFilter("Descripción")]
        public string Description { get; set; }
    }
}
