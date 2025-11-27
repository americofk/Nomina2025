/// <summary>
/// Modelo de datos para representar departamentos.
/// Define las áreas organizacionales y su estructura dentro de la empresa.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Department.
    /// </summary>
    public class Department : AuditableCompanyModel
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [CustomFilter("Id Departamento")]
        public string DepartmentId { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        [MaxLength(50)]
        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        /// <summary>

        /// Valor numerico para QtyWorkers.

        /// </summary>

        [Required(ErrorMessage = "Número de trabajadores" + ErrorMsg.Emptyf)]
        public int QtyWorkers { get; set; }

        /// <summary>

        /// Fecha.

        /// </summary>

        [CustomFilter("Fecha inicio")]
        [Required(ErrorMessage = "Fecha de inicio" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        /// <summary>

        /// Fecha.

        /// </summary>

        [Required(ErrorMessage = "Fecha de fin" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        /// <summary>

        /// Descripcion.

        /// </summary>

        [MaxLength(100)]
        public string Description { get; set; }        
    }
}
