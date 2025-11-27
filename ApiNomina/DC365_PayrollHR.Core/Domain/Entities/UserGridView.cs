/// <summary>
/// Entidad de dominio para almacenar las vistas guardadas por usuario.
/// Permite guardar configuraciones de Grid/Kanban/Calendar con auditoría ISO 27001.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.ComponentModel.DataAnnotations;
using DC365_PayrollHR.Core.Domain.Common;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Representa una vista guardada por un usuario para una entidad específica.
    /// Almacena la configuración completa en formato JSON (columnas, filtros, orden, etc.).
    /// </summary>
    public class UserGridView : AuditableCompanyEntity
    {
        /// <summary>
        /// Referencia (RecId) del usuario propietario de la vista.
        /// </summary>
        public long UserRefRecId { get; set; }

        /// <summary>
        /// Nombre de la entidad de negocio a la que aplica la vista (p. ej., "Department").
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string EntityName { get; set; } = string.Empty;

        /// <summary>
        /// Tipo de vista: "Grid", "Kanban" o "Calendar".
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string ViewType { get; set; } = "Grid";

        /// <summary>
        /// Ámbito de visibilidad: "Private", "Company", "Role" o "Public".
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string ViewScope { get; set; } = "Private";

        /// <summary>
        /// Referencia (RecId) del rol, requerida si ViewScope = "Role".
        /// </summary>
        public long? RoleRefRecId { get; set; }

        /// <summary>
        /// Nombre legible de la vista (único por usuario+entidad).
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string ViewName { get; set; } = string.Empty;

        /// <summary>
        /// Descripción opcional de la vista.
        /// </summary>
        [MaxLength(500)]
        public string ViewDescription { get; set; }

        /// <summary>
        /// Indica si esta vista es la predeterminada del usuario para la entidad.
        /// </summary>
        public bool IsDefault { get; set; }

        /// <summary>
        /// Si está bloqueada, evita que otros usuarios (en ámbitos compartidos) la editen.
        /// </summary>
        public bool IsLocked { get; set; }

        /// <summary>
        /// Configuración completa de la vista en JSON (columnas, filtros, ordenamiento, etc.).
        /// </summary>
        [Required]
        public string ViewConfig { get; set; } = "{}";

        /// <summary>
        /// Versión del esquema del JSON (para migraciones de estructura).
        /// </summary>
        public int SchemaVersion { get; set; } = 1;

        /// <summary>
        /// Hash (SHA-256 en hex, 64 chars) para verificar integridad del JSON (opcional).
        /// </summary>
        [MaxLength(64)]
        public string Checksum { get; set; }

        /// <summary>
        /// Contador de usos de la vista (para analítica/UX).
        /// </summary>
        public int UsageCount { get; set; }

        /// <summary>
        /// Última fecha/hora de uso de la vista.
        /// </summary>
        public DateTime? LastUsedOn { get; set; }

        /// <summary>
        /// Etiquetas de clasificación/búsqueda (separadas por comas).
        /// </summary>
        [MaxLength(200)]
        public string Tags { get; set; }
    }
}
