using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Common
{
    /// <summary>
    /// Clase para gestion de AuditableEntity.
    /// </summary>
    public class AuditableEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public long RecId { get; set; }

        /// <summary>

        /// Fecha de creacion.

        /// </summary>

        [MaxLength(20)]
        public string CreatedBy { get; set; }
        /// <summary>
        /// Fecha de creacion.
        /// </summary>
        public DateTime CreatedOn { get; set; }

        /// <summary>

        /// Fecha de modificacion.

        /// </summary>

        [MaxLength(20)]
        public string ModifiedBy { get; set; }
        /// <summary>
        /// Fecha de modificacion.
        /// </summary>
        public DateTime ModifiedOn { get; set; }

        /// <summary>

        /// Indica si.

        /// </summary>

        public bool IsDeleted { get; set; } = false;

        /// <summary>

        /// Valor de texto para DeletedBy.

        /// </summary>

        [MaxLength(20)]
        public string? DeletedBy { get; set; }
        /// <summary>
        /// Fecha de DeletedOn.
        /// </summary>
        public DateTime? DeletedOn { get; set; }
    }
}
