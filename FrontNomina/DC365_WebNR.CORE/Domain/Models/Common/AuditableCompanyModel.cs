using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models.Common
{
    /// <summary>
    /// Base class for company-specific auditable entities with ISO 27001 compliance fields
    /// </summary>
    public abstract class AuditableCompanyModel : AuditableModel
    {
        /// <summary>
        /// Company identifier (formerly InCompany).
        /// Se asigna automáticamente desde la sesión del usuario en el controlador.
        /// </summary>
        [MaxLength(10)]
        [Display(Name = "Empresa")]
        public string DataAreaId { get; set; }
    }
}
