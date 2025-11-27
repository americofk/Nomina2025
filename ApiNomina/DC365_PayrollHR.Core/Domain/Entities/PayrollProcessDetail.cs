/// <summary>
/// Entidad de dominio para PayrollProcessDetail.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de PayrollProcessDetail.
    /// </summary>
    public class PayrollProcessDetail: AuditableCompanyEntity
    {
        //public string ProcessDetailId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PayrollProcessId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal TotalAmount { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal TotalTaxAmount { get; set; }
        /// <summary>
        /// Obtiene o establece PayMethod.
        /// </summary>
        public PayMethod PayMethod { get; set; } //Usarlo para filtrar los que van al documento de pago electrónico
        /// <summary>
        /// Valor de texto para BankAccount.
        /// </summary>
        public string BankAccount { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string BankName { get; set; }
        /// <summary>
        /// Valor de texto para Document.
        /// </summary>
        public string Document { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartWorkDate { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public PayrollProcessStatus PayrollProcessStatus { get; set; }

        //Modificación para el calculo de las deducciones de tss
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal TotalTssAmount { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal TotalTssAndTaxAmount { get; set; }
    }
}
