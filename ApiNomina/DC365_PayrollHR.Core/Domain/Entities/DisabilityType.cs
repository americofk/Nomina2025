using DC365_PayrollHR.Core.Domain.Common;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class DisabilityType : AuditableEntity
    {
        public string DisabilityTypeId { get; set; }
        public string Description { get; set; }
    }
}
