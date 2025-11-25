using DC365_PayrollHR.Core.Domain.Common;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class CoursePosition: AuditableCompanyEntity
    {
        public string PositionId { get; set; }
        public string CourseId { get; set; }
        public string Comment { get; set; }
    }
}
