/// <summary>
/// Modelo de respuesta paginada para operaciones del sistema.
/// Extiende Response agregando información de paginación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de respuesta paginada.
    /// </summary>
    public class PagedResponse<T> : Response<T>
    {
        /// <summary>
        /// Número de página actual.
        /// </summary>
        public int PageNumber { get; set; }

        /// <summary>
        /// Cantidad de registros por página.
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Total de registros en la base de datos.
        /// </summary>
        public int TotalRecords { get; set; }

        /// <summary>
        /// Total de páginas disponibles.
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// Indica si hay página anterior.
        /// </summary>
        public bool HasPreviousPage { get; set; }

        /// <summary>
        /// Indica si hay página siguiente.
        /// </summary>
        public bool HasNextPage { get; set; }
    }
}
