/// <summary>
/// Entidad de dominio para EmpPayrollProcessHelper.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Helpers
{
    /// <summary>
    /// Clase auxiliar para EmpPayrollProcess.
    /// </summary>
    public class EmpPayrollProcessHelper
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Obtiene o establece PayMethod.
        /// </summary>
        public PayMethod PayMethod { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartWorkDate { get; set; }
    }
}
