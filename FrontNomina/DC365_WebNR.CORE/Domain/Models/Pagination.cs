/// <summary>
/// Modelo de datos para paginación de resultados.
/// Proporciona información de página, tamaño y total de registros en consultas paginadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Pagination.
    /// </summary>
    public class Pagination<T> : Response<T>
    {
        /// <summary>
        /// Numero.
        /// </summary>
        public int PageNumber { get; set; }
        /// <summary>
        /// Valor numerico para PageSize.
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// Valor numerico para TotalRecords.
        /// </summary>
        public int TotalRecords { get; set; }
    }

    /// <summary>
    /// Resultado paginado para uso en servicios.
    /// </summary>
    public class PaginatedResult<T>
    {
        /// <summary>
        /// Datos de la página actual.
        /// </summary>
        public List<T> Data { get; set; } = new List<T>();
        /// <summary>
        /// Total de registros en la base de datos.
        /// </summary>
        public int TotalRecords { get; set; }
        /// <summary>
        /// Número de página actual.
        /// </summary>
        public int PageNumber { get; set; }
        /// <summary>
        /// Tamaño de página.
        /// </summary>
        public int PageSize { get; set; }
    }
}
