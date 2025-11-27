/// <summary>
/// Modelo de datos para representar préstamos de empleados.
/// Define los préstamos otorgados a empleados y su esquema de pago.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeLoan.
    /// </summary>
    public class EmployeeLoan: GenericError, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        [Required(ErrorMessage = "Codigo" + ErrorMsg.Emptym)]
        public string LoanId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string LoanName { get; set; }

        /// <summary>

        /// Fecha de ValidTo.

        /// </summary>

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]
        public DateTime ValidTo { get; set; }

        /// <summary>

        /// Fecha de ValidFrom.

        /// </summary>

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]
        public DateTime ValidFrom { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        [Required(ErrorMessage = "Monto" + ErrorMsg.Emptym)]
        public decimal LoanAmount { get; set; }
        /// <summary>
        /// Valor numerico para PayDays.
        /// </summary>
        public int PayDays { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PaidAmount { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal PendingAmount { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]
        public string PayrollId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PayrollName { get; set; }
        /// <summary>
        /// Obtiene o establece PayFrecuency.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdLoan { get; set; }
        /// <summary>
        /// Valor numerico para AmountByDues.
        /// </summary>
        [Required(ErrorMessage = "Cuotas" + ErrorMsg.Emptym)]
        public decimal AmountByDues { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId
        {
            get
            {
                return EmployeeIdLoan;
            }
        }
        
       

        //public PayFrecuency PayFrecuency { get; set; }
        //public int PayDays { get; set; }

        /// <summary>

        /// Valor numerico para TotalDues.

        /// </summary>

        public int TotalDues { get; set; }
        /// <summary>
        /// Valor numerico para PendingDues.
        /// </summary>
        public int PendingDues { get; set; }

        /// <summary>

        /// Valor numerico para QtyPeriodForPaid.

        /// </summary>

        [Required(ErrorMessage = "Frecuencia de pago" + ErrorMsg.Emptyf)]
        public int QtyPeriodForPaid { get; set; }
        /// <summary>
        /// Valor numerico para StartPeriodForPaid.
        /// </summary>
        [Required(ErrorMessage = ErrorMsg.Emptym)]
        public int StartPeriodForPaid { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>();
            validationResults.Add((QtyPeriodForPaid == 0) ? new ValidationResult("Frecuencia de pago" + ErrorMsg.Empty0) : null);
            validationResults.Add((AmountByDues == 0) ? new ValidationResult( "Cuotas" + ErrorMsg.Empty0 ) : null);
            validationResults.Add((LoanAmount == 0) ?  new ValidationResult( "Monto" + ErrorMsg.Empty0): null);
            validationResults.Add((PendingAmount == 0) ?  new ValidationResult("Monto pendiente" + ErrorMsg.Empty0): null);
            return validationResults;
        }
    }
}
