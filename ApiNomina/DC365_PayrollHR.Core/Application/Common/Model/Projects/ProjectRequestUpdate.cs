using System.ComponentModel.DataAnnotations;

namespace DC365_PayrollHR.Core.Application.Common.Model.Projects
{
    public class ProjectRequestUpdate
    {
        [Required(ErrorMessage = "El nombre no puede estar vacío")]
        public string Name { get; set; }

        public string LedgerAccount { get; set; }
    }
}
