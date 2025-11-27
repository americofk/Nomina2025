/// <summary>
/// Modelo de datos para representar requisitos de posiciones.
/// Define los requisitos necesarios para ocupar un puesto específico.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de PositionRequirement.
    /// </summary>
    public  class PositionRequirement
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }
        /// <summary>
        /// Valor de texto para Detail.
        /// </summary>
        public string Detail { get; set; }
        /// <summary>
        /// Puesto.
        /// </summary>
        public string PositionIdRequirement { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string PositionId
        {
            get { return PositionIdRequirement;}

        }
    }
}
