/// <summary>
/// Entidad para la vista View_SeveranceInfo.
/// Contiene información de pagos de empleados que aplican para prestaciones.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Representa un registro de la vista View_SeveranceInfo.
    /// </summary>
    public class ViewSeveranceInfo
    {
        /// <summary>
        /// ID del empleado.
        /// </summary>
        public string EmployeeId { get; set; }

        /// <summary>
        /// Fecha de inicio de trabajo del empleado.
        /// </summary>
        public DateTime StartWorkDate { get; set; }

        /// <summary>
        /// Nombre del código de ganancia.
        /// </summary>
        public string CodigoDeGanancia { get; set; }

        /// <summary>
        /// Indica si aplica para prestaciones.
        /// </summary>
        public bool IsSeverance { get; set; }

        /// <summary>
        /// Monto de la acción/pago.
        /// </summary>
        public decimal ActionAmount { get; set; }

        /// <summary>
        /// Fecha de pago.
        /// </summary>
        public DateTime PaymentDate { get; set; }

        /// <summary>
        /// Estado del proceso de nómina.
        /// </summary>
        public int PayrollProcessStatus { get; set; }

        /// <summary>
        /// Número de documento del empleado.
        /// </summary>
        public string DocumentNumber { get; set; }
    }
}
