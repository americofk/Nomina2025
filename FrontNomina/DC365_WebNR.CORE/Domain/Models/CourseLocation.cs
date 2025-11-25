using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class CourseLocation
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
