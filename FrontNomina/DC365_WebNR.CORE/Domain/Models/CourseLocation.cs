/// <summary>
/// Modelo de datos para representar ubicaciones de cursos.
/// Define los lugares donde se imparten las capacitaciones y su información de contacto.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de CourseLocation.
    /// </summary>
    public class CourseLocation : AuditableCompanyModel
    {
        /// <summary>
        /// Automatic
        /// </summary>
        /// 
        [CustomFilter("Id Ubicación")]
        public string CourseLocationId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        [MaxLength(50)]
        [Required (ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        [MaxLength(20)]
        [Required(ErrorMessage = "Teléfono" + ErrorMsg.Emptym)]
        public string Phone { get; set; }
        /// <summary>
        /// Required / Max 100
        /// </summary>
        [MaxLength(100)]
        [RegularExpression("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", ErrorMessage = ErrorMsg.Email)]
        [Required(ErrorMessage = "Correo" + ErrorMsg.Emptym)]

        [CustomFilter("Mail")]
        public string Mail { get; set; }
        /// <summary>
        /// Required / Max 500
        [MaxLength(500)]
        [Required(ErrorMessage = "Dirección" + ErrorMsg.Emptyf)]
        public string Address { get; set; }
        /// </summary>
        /// <summary>
        /// Required / Max 50
        /// </summary>
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre contacto")]
        public string ContactName { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        [MaxLength(100)]
        public string Comment { get; set; }
       
    }
}
