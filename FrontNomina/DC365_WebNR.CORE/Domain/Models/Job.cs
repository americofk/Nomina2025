using DC365_WebNR.CORE.Domain.Const;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Cargo
    /// </summary>
    public class Job
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
        [Required(ErrorMessage = "Descripción" + ErrorMsg.Emptym)]
        [CustomFilter("Descripción")]
        public string Description { get; set; }

        public bool JobStatus { get; set; } = true;

    }


}
