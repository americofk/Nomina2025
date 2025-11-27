/// <summary>
/// Modelo de respuesta para CoursePosition.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿namespace DC365_PayrollHR.Core.Application.Common.Model.CoursePositons
{
    /// <summary>
    /// Modelo de respuesta para CoursePosition.
    /// </summary>
    public class CoursePositionResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
    }
}
