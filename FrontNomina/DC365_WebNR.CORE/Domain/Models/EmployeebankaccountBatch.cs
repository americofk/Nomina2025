using DC365_WebNR.CORE.Domain.Models.Enums;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeebankaccountBatch
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string BankName { get; set; }
        public AccountType AccountType { get; set; }
        public string AccountNum { get; set; }
        public bool IsPrincipal { get; set; }
        public string Currency { get; set; }
    }
}
