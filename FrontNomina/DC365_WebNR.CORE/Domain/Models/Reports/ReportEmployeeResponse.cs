/// <summary>
/// Modelo de respuesta para reporte de empleados.
/// Contiene información detallada de empleados para generación de reportes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    /// <summary>
    /// Modelo de respuesta para ReportEmployee.
    /// </summary>
    public class ReportEmployeeResponse
    {
        /// <summary>
        /// Empleado.
        /// </summary>
        public int TotalEmployee { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public List<GroupReportEmployeeInfo> GroupEmployeeInfo { get; set; }
    }

    /// <summary>

    /// Clase para gestion de GroupReportEmployeeInfo.

    /// </summary>

    public class GroupReportEmployeeInfo
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public List<ReportEmployeeInfo> EmployeeInfo { get; set; }
    }

    /// <summary>

    /// Clase para gestion de ReportEmployeeInfo.

    /// </summary>

    public class ReportEmployeeInfo
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
        /// Fecha.
        /// </summary>
        public DateTime BirthDate { get; set; }
        /// <summary>
        /// Valor de texto para Gender.
        /// </summary>
        public string Gender { get; set; }
        /// <summary>
        /// Valor numerico para Age.
        /// </summary>
        public int Age { get; set; }
        /// <summary>
        /// Valor de texto para NSS.
        /// </summary>
        public string NSS { get; set; }
        /// <summary>
        /// Valor de texto para ARS.
        /// </summary>
        public string ARS { get; set; }
        /// <summary>
        /// Valor de texto para AFP.
        /// </summary>
        public string AFP { get; set; }
        /// <summary>
        /// Pais.
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartWorkDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime EndWorkDate { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        public string PositionName { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
    }
}

