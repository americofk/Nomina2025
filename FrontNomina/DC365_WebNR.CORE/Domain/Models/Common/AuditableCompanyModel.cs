using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models.Common
{
    /// <summary>
    /// Base class for company-specific auditable entities with ISO 27001 compliance fields
    /// </summary>
    public abstract class AuditableCompanyModel : AuditableModel
    {
        /// <summary>
        /// Company identifier (formerly InCompany)
        /// </summary>
        [Required]
        [MaxLength(10)]
        [Display(Name = "Empresa")]
        public string DataAreaId { get; set; }
    }
}
