/// <summary>
/// Interfaz para ApplicationDbContext.
/// Define el contrato de operaciones disponibles.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    /// <summary>
    /// Contexto de base de datos IApplicationDb.
    /// </summary>
    public interface IApplicationDbContext
    {
        /// <summary>
        /// Nomina.
        /// </summary>
        public DbSet<Payroll> Payrolls { get; set; }
        /// <summary>
        /// Obtiene o establece PayCycles.
        /// </summary>
        public DbSet<PayCycle> PayCycles { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public DbSet<EarningCode> EarningCodes { get; set; }
        /// <summary>
        /// Deduccion.
        /// </summary>
        public DbSet<DeductionCode> DeductionCodes { get; set; }
        /// <summary>
        /// Puesto.
        /// </summary>
        public DbSet<Position> Positions { get; set; }
        /// <summary>
        /// Cargo.
        /// </summary>
        public DbSet<Job> Jobs { get; set; }
        /// <summary>
        /// Puesto.
        /// </summary>
        public DbSet<PositionRequirement> PositionRequirements { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public DbSet<Department> Departments { get; set; }
        /// <summary>
        /// Obtiene o establece CourseLocations.
        /// </summary>
        public DbSet<CourseLocation> CourseLocations { get; set; }
        /// <summary>
        /// Obtiene o establece ClassRooms.
        /// </summary>
        public DbSet<ClassRoom> ClassRooms { get; set; }
        /// <summary>
        /// Obtiene o establece CourseTypes.
        /// </summary>
        public DbSet<CourseType> CourseTypes { get; set; }
        /// <summary>
        /// Usuario.
        /// </summary>
        public DbSet<User> Users { get; set; }
        /// <summary>
        /// Imagen.
        /// </summary>
        public DbSet<UserImage> UserImages { get; set; }
        /// <summary>
        /// Obtiene o establece FormatCodes.
        /// </summary>
        public DbSet<FormatCode> FormatCodes { get; set; }
        /// <summary>
        /// Obtiene o establece Instructors.
        /// </summary>
        public DbSet<Instructor> Instructors { get; set; }
        /// <summary>
        /// Obtiene o establece CourseInstructors.
        /// </summary>
        public DbSet<CourseInstructor> CourseInstructors { get; set; }
        /// <summary>
        /// Obtiene o establece Courses.
        /// </summary>
        public DbSet<Course> Courses { get; set; }
        /// <summary>
        /// Puesto.
        /// </summary>
        public DbSet<CoursePosition> CoursePositions { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<CourseEmployee> CourseEmployees { get; set; }
        /// <summary>
        /// Obtiene o establece Currencies.
        /// </summary>
        public DbSet<Currency> Currencies { get; set; }
        /// <summary>
        /// Obtiene o establece Projects.
        /// </summary>
        public DbSet<Project> Projects { get; set; }
        /// <summary>
        /// Obtiene o establece ProjCategories.
        /// </summary>
        public DbSet<ProjCategory> ProjCategories { get; set; }
        /// <summary>
        /// Nomina.
        /// </summary>
        public DbSet<PayrollProcess> PayrollsProcess { get; set; }
        /// <summary>
        /// Nomina.
        /// </summary>
        public DbSet<PayrollProcessDetail> PayrollProcessDetails { get; set; }
        /// <summary>
        /// Nomina.
        /// </summary>
        public DbSet<PayrollProcessAction> PayrollProcessActions { get; set; }

        /// <summary>

        /// Obtiene o establece Companies.

        /// </summary>

        public DbSet<Company> Companies { get; set; }
        /// <summary>
        /// Usuario.
        /// </summary>
        public DbSet<CompaniesAssignedToUser> CompaniesAssignedToUsers { get; set; }
        /// <summary>
        /// Usuario.
        /// </summary>
        public DbSet<MenuAssignedToUser> MenuAssignedToUsers { get; set; }
        /// <summary>
        /// Obtiene o establece MenusApp.
        /// </summary>
        public DbSet<MenuApp> MenusApp { get; set; }
        /// <summary>
        /// Obtiene o establece Countries.
        /// </summary>
        public DbSet<Country> Countries { get; set; }

        /// <summary>

        /// Empleado.

        /// </summary>

        public DbSet<Employee> Employees { get; set; }
        /// <summary>
        /// Imagen.
        /// </summary>
        public DbSet<EmployeeImage> EmployeeImages { get; set; }
        /// <summary>
        /// Direccion.
        /// </summary>
        public DbSet<EmployeeAddress> EmployeesAddress { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeContactInf> EmployeeContactsInf { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeBankAccount> EmployeeBankAccounts { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeDocument> EmployeeDocuments { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeEarningCode> EmployeeEarningCodes { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeDeductionCode> EmployeeDeductionCodes { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeDepartment> EmployeeDepartments { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeePosition> EmployeePositions { get; set; }
        /// <summary>
        /// Impuesto.
        /// </summary>
        public DbSet<Tax> Taxes { get; set; }
        /// <summary>
        /// Impuesto.
        /// </summary>
        public DbSet<TaxDetail> TaxDetails { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeLoan> EmployeeLoans { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeTax> EmployeeTaxes { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeExtraHour> EmployeeExtraHours { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public DbSet<Loan> Loans { get; set; }
        /// <summary>
        /// Ganancia.
        /// </summary>
        public DbSet<EarningCodeVersion> EarningCodeVersions { get; set; }
        /// <summary>
        /// Deduccion.
        /// </summary>
        public DbSet<DeductionCodeVersion> DeductionCodeVersions { get; set; }

        /// <summary>

        /// Obtiene o establece BatchHistories.

        /// </summary>

        public DbSet<BatchHistory> BatchHistories { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeLoanHistory> EmployeeLoanHistories { get; set; }
        /// <summary>
        /// Obtiene o establece ReportsConfig.
        /// </summary>
        public DbSet<ReportConfig> ReportsConfig { get; set; }

        /// <summary>

        /// Empleado.

        /// </summary>

        public DbSet<EmployeeHistory> EmployeeHistories { get; set; }
        /// <summary>
        /// Obtiene o establece DisabilityTypes.
        /// </summary>
        public DbSet<DisabilityType> DisabilityTypes { get; set; }
        /// <summary>
        /// Obtiene o establece EducationLevels.
        /// </summary>
        public DbSet<EducationLevel> EducationLevels { get; set; }
        /// <summary>
        /// Obtiene o establece Occupations.
        /// </summary>
        public DbSet<Occupation> Occupations { get; set; }

        /// <summary>

        /// Obtiene o establece Provinces.

        /// </summary>

        public DbSet<Province> Provinces { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeWorkCalendar> EmployeeWorkCalendars { get; set; }

        /// <summary>

        /// Obtiene o establece CalendarHolidays.

        /// </summary>

        public DbSet<CalendarHoliday> CalendarHolidays { get; set; }

        /// <summary>

        /// Obtiene o establece GeneralConfigs.

        /// </summary>

        public DbSet<GeneralConfig> GeneralConfigs { get; set; }

        /// <summary>

        /// Empleado.

        /// </summary>

        public DbSet<EmployeeWorkControlCalendar> EmployeeWorkControlCalendars { get; set; }

        /// <summary>
        /// Vistas de usuario para grids/tablas.
        /// </summary>
        public DbSet<UserGridView> UserGridViews { get; set; }

        /// <summary>
        /// Registros de auditoría ISO 27001.
        /// </summary>
        public DbSet<AuditLog> AuditLogs { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        /// <summary>

        /// Obtiene o establece Database.

        /// </summary>

        public DatabaseFacade Database { get; }
    }
}
