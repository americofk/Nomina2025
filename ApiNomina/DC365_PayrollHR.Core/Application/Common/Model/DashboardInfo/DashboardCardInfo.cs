/// <summary>
/// Entidad de dominio para DashboardCardInfo.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.DashboardInfo
{
    /// <summary>
    /// Clase para gestion de DashboardCardInfo.
    /// </summary>
    public class DashboardCardInfo
    {
        /// <summary>
        /// Empleado.
        /// </summary>
        public int Employees { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public int Departments { get; set; }
        /// <summary>
        /// Puesto.
        /// </summary>
        public int Positions { get; set; }
        /// <summary>
        /// Valor numerico para Courses.
        /// </summary>
        public int Courses { get; set; }
    }
}
