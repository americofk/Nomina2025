/// <summary>
/// Modelo para vistas de usuario personalizadas de grids.
/// Permite almacenar configuraciones de columnas, filtros y ordenamiento
/// para que cada usuario pueda personalizar su experiencia.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_WebNR.CORE.Domain.Models.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Representa una vista personalizada de grid para un usuario.
    /// </summary>
    public class UserGridView : AuditableModel
    {
        /// <summary>
        /// RecId del usuario propietario de la vista.
        /// </summary>
        [Required]
        public long UserRefRecId { get; set; }

        /// <summary>
        /// Nombre de la entidad (ej: "Department", "Employee").
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string EntityName { get; set; }

        /// <summary>
        /// Tipo de vista: Grid, Kanban, Calendar.
        /// </summary>
        [MaxLength(20)]
        public string ViewType { get; set; } = "Grid";

        /// <summary>
        /// Ámbito de la vista: Private, Company, Role, Public.
        /// </summary>
        [MaxLength(20)]
        public string ViewScope { get; set; } = "Private";

        /// <summary>
        /// RecId del rol (si ViewScope es Role).
        /// </summary>
        public long? RoleRefRecId { get; set; }

        /// <summary>
        /// Nombre de la vista.
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string ViewName { get; set; }

        /// <summary>
        /// Descripción opcional de la vista.
        /// </summary>
        [MaxLength(500)]
        public string ViewDescription { get; set; }

        /// <summary>
        /// Indica si es la vista predeterminada del usuario para esta entidad.
        /// </summary>
        public bool IsDefault { get; set; }

        /// <summary>
        /// Indica si la vista está bloqueada para edición.
        /// </summary>
        public bool IsLocked { get; set; }

        /// <summary>
        /// Configuración JSON de la vista (columnas, filtros, ordenamiento).
        /// </summary>
        [Required]
        public string ViewConfig { get; set; } = "{}";

        /// <summary>
        /// Versión del esquema de configuración.
        /// </summary>
        public int SchemaVersion { get; set; } = 1;

        /// <summary>
        /// Checksum SHA-256 del JSON para validación de integridad.
        /// </summary>
        [MaxLength(64)]
        public string Checksum { get; set; }

        /// <summary>
        /// Contador de uso de la vista.
        /// </summary>
        public int UsageCount { get; set; }

        /// <summary>
        /// Última fecha de uso de la vista.
        /// </summary>
        public DateTime? LastUsedOn { get; set; }

        /// <summary>
        /// Etiquetas separadas por comas para categorización.
        /// </summary>
        [MaxLength(200)]
        public string Tags { get; set; }

        /// <summary>
        /// Identificador de empresa (para vistas Company scope).
        /// </summary>
        [MaxLength(10)]
        public string DataAreaId { get; set; }
    }
}
