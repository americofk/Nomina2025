/// <summary>
/// Modelo de datos para representar cursos de capacitación.
/// Incluye información sobre fechas, participantes, instructores y configuración del curso.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Course.
    /// </summary>
    public class Course 
    {
        /// <summary>
        /// Automatic
        /// </summary>
        /// 
        [CustomFilter("Id Curso")]
        public string CourseId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        /// [MaxLength(50)]
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]

        public string CourseName { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
         [MaxLength(20)]
        [Required(ErrorMessage = "Tipo de curso" + ErrorMsg.Emptym)]
        
        public string CourseTypeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        [CustomFilter("Tipo de curso")]
        public string CourseTypeName { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsMatrixTraining { get; set; }
        /// <summary>
        /// Internal = 0, External = 1
        /// </summary>
        public InternalExternal InternalExternal { get; set; }
        /// <summary>
        /// Max 20
        /// </summary>
        [MaxLength(20)]
        public string CourseParentId { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        [MaxLength(20)]
        [Required(ErrorMessage = "Aula o salón" + ErrorMsg.Emptym)]
        public string ClassRoomId { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        public string ClassRoomName { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha y hora de inicio" + ErrorMsg.Emptyf)]
        public DateTime StartDateTime { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha y hora final" + ErrorMsg.Emptyf)]
        public DateTime EndDateTime { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Minimo de participantes" + ErrorMsg.Emptym)]
        public int MinStudents { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Máximo de participantes" + ErrorMsg.Emptym)]
        public int MaxStudents { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Periodicidad" + ErrorMsg.Emptym)]
        public int Periodicity { get; set; }
        /// <summary>
        /// Required
        /// </summary>
        [Required(ErrorMessage = "Cantidad de sesiones" + ErrorMsg.Emptym)]
        public int QtySessions { get; set; }

        /// <summary>
        /// Max 300
        /// </summary>
        [MaxLength(300)]
        public string Description { get; set; }
        /// <summary>
        /// Required / Max 1000
        /// </summary>
        [MaxLength(1000)]
        [Required(ErrorMessage = "Objetivos del curso" + ErrorMsg.Emptym)]
        public string Objetives { get; set; }
        /// <summary>
        /// Required / Max 1000
        /// </summary>
       [MaxLength(1000)]
        [Required(ErrorMessage = "Temas del curso" + ErrorMsg.Emptym)]
        public string Topics { get; set; }

        /// <summary>
        /// Created = 0, InProcess = 1, Closed = 2
        /// </summary>
        public CourseStatus CourseStatus { get; set; }

        /// <summary>

        /// Indica el estado de MatrixTraining.

        /// </summary>

        public bool MatrixTraining { get; set; }

    }
}
