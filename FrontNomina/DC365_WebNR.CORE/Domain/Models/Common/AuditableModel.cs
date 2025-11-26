using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models.Common
{
    /// <summary>
    /// Base class for auditable entities with ISO 27001 compliance fields
    /// </summary>
    public abstract class AuditableModel
    {
        /// <summary>
        /// Unique record identifier using global SEQUENCE
        /// </summary>
        public long RecId { get; set; }

        /// <summary>
        /// User who created the record
        /// </summary>
        [MaxLength(20)]
        public string CreatedBy { get; set; }

        /// <summary>
        /// Date and time when the record was created
        /// </summary>
        [Display(Name = "Creado el")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedOn { get; set; }

        /// <summary>
        /// User who last modified the record
        /// </summary>
        [MaxLength(20)]
        public string ModifiedBy { get; set; }

        /// <summary>
        /// Date and time of last modification
        /// </summary>
        [Display(Name = "Modificado el")]
        [DataType(DataType.DateTime)]
        public DateTime ModifiedOn { get; set; }

        /// <summary>
        /// Soft delete flag - true if record is deleted
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// User who deleted the record (null if not deleted)
        /// </summary>
        [MaxLength(20)]
        public string DeletedBy { get; set; }

        /// <summary>
        /// Date and time when record was deleted (null if not deleted)
        /// </summary>
        [Display(Name = "Eliminado el")]
        [DataType(DataType.DateTime)]
        public DateTime? DeletedOn { get; set; }
    }
}
