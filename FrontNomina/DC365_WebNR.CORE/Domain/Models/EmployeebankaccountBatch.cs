/// <summary>
/// Modelo para procesamiento por lotes de cuentas bancarias de empleados.
/// Permite importar o actualizar múltiples cuentas bancarias de empleados de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeebankaccountBatch.
    /// </summary>
    public class EmployeebankaccountBatch
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string BankName { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public AccountType AccountType { get; set; }
        /// <summary>
        /// Valor de texto para AccountNum.
        /// </summary>
        public string AccountNum { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Valor de texto para Currency.
        /// </summary>
        public string Currency { get; set; }
    }
}
