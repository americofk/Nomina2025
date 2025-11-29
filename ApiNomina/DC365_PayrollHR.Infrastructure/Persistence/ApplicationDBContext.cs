/// <summary>
/// Contexto de base de datos para ApplicationDBContext.
/// Gestiona la conexión y operaciones con la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Infrastructure.Persistence.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Infrastructure.Persistence
{
    /// <summary>
    /// Contexto de base de datos ApplicationDB.
    /// </summary>
    public class ApplicationDBContext : DbContext, IApplicationDbContext
    {
        private readonly ICurrentUserInformation _CurrentUserInformation;

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options, ICurrentUserInformation currentUserInformation)
            : base(options)
        {
            _CurrentUserInformation = currentUserInformation;
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("server=.\\SQLEXPRESS;database=DC365_PayrollDataApp;trusted_connection=true;");
        //}

        /// <summary>

        /// Ejecuta la operacion OnModelCreating.

        /// </summary>

        /// <param name="modelBuilder">Parametro modelBuilder.</param>

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder = GlobalQueryFilter(modelBuilder);

            //Configurar secuencias
            SequenceConfiguration.ConfigureSequences(modelBuilder);

            //Se usa reflexión para acceder a la configuraciones de las entidades
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //Insertar data generica
            ApplicationDbContextSeed.Seed(modelBuilder);

            base.OnModelCreating(modelBuilder);

            // Configurar RecId con secuencia para todas las entidades auditables
            ConfigureRecIdForAuditableEntities(modelBuilder);

            //Añadir filtros globales
            //GlobalFilterConfiguration.ConfigureFilter(modelBuilder, _CurrentUserInformation.Company);
        }

        /// <summary>
        /// Configura el RecId con valor por defecto de secuencia para todas las entidades
        /// que heredan de AuditableEntity o AuditableCompanyEntity.
        /// </summary>
        private void ConfigureRecIdForAuditableEntities(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var clrType = entityType.ClrType;

                // Verificar si hereda de AuditableEntity o AuditableCompanyEntity
                if (typeof(AuditableEntity).IsAssignableFrom(clrType) ||
                    typeof(AuditableCompanyEntity).IsAssignableFrom(clrType))
                {
                    // Buscar la propiedad RecId
                    var recIdProperty = entityType.FindProperty("RecId");
                    if (recIdProperty != null)
                    {
                        // Solo configurar si no tiene ya un valor por defecto
                        if (recIdProperty.GetDefaultValueSql() == null)
                        {
                            recIdProperty.SetDefaultValueSql("NEXT VALUE FOR dbo.RecId");
                        }
                    }
                }
            }
        }

        public override DatabaseFacade Database => base.Database;

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="cancellationToken">Parametro cancellationToken.</param>

        /// <returns>Resultado de la operacion.</returns>

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            DateTime dateTime = DateTime.Now;

            // Audit trail for entities
            foreach (Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<AuditableEntity> entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = _CurrentUserInformation.Alias;
                        entry.Entity.CreatedOn = dateTime;
                        entry.Entity.IsDeleted = false;
                        break;

                    case EntityState.Modified:
                        entry.Entity.ModifiedBy = _CurrentUserInformation.Alias;
                        entry.Entity.ModifiedOn = dateTime;
                        break;

                    case EntityState.Deleted:
                        // Soft delete implementation (ISO 27001 compliance)
                        entry.State = EntityState.Modified;
                        entry.Entity.IsDeleted = true;
                        entry.Entity.DeletedBy = _CurrentUserInformation.Alias;
                        entry.Entity.DeletedOn = dateTime;
                        break;
                }
            }

            // Audit trail for company entities
            foreach (Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<AuditableCompanyEntity> entry in ChangeTracker.Entries<AuditableCompanyEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        if (string.IsNullOrEmpty(entry.Entity.DataAreaId))
                        {
                            entry.Entity.CreatedBy = _CurrentUserInformation.Alias;
                            entry.Entity.CreatedOn = dateTime;
                            entry.Entity.DataAreaId = _CurrentUserInformation.Company;
                            entry.Entity.IsDeleted = false;
                        }
                        break;

                    case EntityState.Modified:
                        entry.Entity.ModifiedBy = _CurrentUserInformation.Alias;
                        entry.Entity.ModifiedOn = dateTime;
                        break;

                    case EntityState.Deleted:
                        // Soft delete implementation (ISO 27001 compliance)
                        entry.State = EntityState.Modified;
                        entry.Entity.IsDeleted = true;
                        entry.Entity.DeletedBy = _CurrentUserInformation.Alias;
                        entry.Entity.DeletedOn = dateTime;
                        break;
                }
            }

            var result = await base.SaveChangesAsync(cancellationToken);

            //await DispatchEvents();

            return result;
        }


        private ModelBuilder GlobalQueryFilter(ModelBuilder modelBuilder)
        {
            // Global filter for company entities (DataAreaId) and soft delete (IsDeleted)
            Expression<Func<AuditableCompanyEntity, bool>> companyFilter = x =>
                x.DataAreaId == _CurrentUserInformation.Company && !x.IsDeleted;

            // Global filter for auditable entities (IsDeleted only)
            Expression<Func<AuditableEntity, bool>> auditableFilter = x => !x.IsDeleted;

            // Apply filters to all entities in context
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Check if entity has DataAreaId property (inherits from AuditableCompanyEntity)
                var dataAreaIdProperty = entityType.FindProperty("DataAreaId");

                if (dataAreaIdProperty != null)
                {
                    // Apply company and soft delete filter
                    var newParam = Expression.Parameter(entityType.ClrType);
                    var newBody = ReplacingExpressionVisitor.Replace(
                        companyFilter.Parameters.First(), newParam, companyFilter.Body);
                    var newLambda = Expression.Lambda(newBody, newParam);
                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(newLambda);
                }
                else
                {
                    // Check if entity has IsDeleted property (inherits from AuditableEntity)
                    var isDeletedProperty = entityType.FindProperty("IsDeleted");

                    if (isDeletedProperty != null)
                    {
                        // Apply only soft delete filter
                        var newParam = Expression.Parameter(entityType.ClrType);
                        var newBody = ReplacingExpressionVisitor.Replace(
                            auditableFilter.Parameters.First(), newParam, auditableFilter.Body);
                        var newLambda = Expression.Lambda(newBody, newParam);
                        modelBuilder.Entity(entityType.ClrType).HasQueryFilter(newLambda);
                    }
                }
            }

            return modelBuilder;
        }


        //Declaración de los db set de las tablas 
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
        /// Ganancia.
        /// </summary>
        public DbSet<EarningCodeVersion> EarningCodeVersions { get; set; }

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
        /// Usuario.
        /// </summary>
        public DbSet<User> Users { get; set; }
        /// <summary>
        /// Imagen.
        /// </summary>
        public DbSet<UserImage> UserImages { get; set; }
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
        /// Impuesto.
        /// </summary>
        public DbSet<Tax> Taxes { get; set; }
        /// <summary>
        /// Impuesto.
        /// </summary>
        public DbSet<TaxDetail> TaxDetails { get; set; }

        /// <summary>

        /// Obtiene o establece FormatCodes.

        /// </summary>

        public DbSet<FormatCode> FormatCodes { get; set; }
        /// <summary>
        /// Usuario.
        /// </summary>
        public DbSet<CompaniesAssignedToUser> CompaniesAssignedToUsers { get; set; }
        /// <summary>
        /// Usuario.
        /// </summary>
        public DbSet<MenuAssignedToUser> MenuAssignedToUsers { get; set; }
        /// <summary>
        /// Obtiene o establece Companies.
        /// </summary>
        public DbSet<Company> Companies { get; set; }
        /// <summary>
        /// Obtiene o establece MenusApp.
        /// </summary>
        public DbSet<MenuApp> MenusApp { get; set; }
        /// <summary>
        /// Obtiene o establece Countries.
        /// </summary>
        public DbSet<Country> Countries { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public DbSet<Loan> Loans { get; set; }

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
        public DbSet<EmployeeDepartment> EmployeeDepartments { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeePosition> EmployeePositions { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeLoan> EmployeeLoans { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public DbSet<EmployeeTax> EmployeeTaxes { get; set; }
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

        #region Courses

        /// <summary>

        /// Obtiene o establece CourseLocations.

        /// </summary>

        public DbSet<CourseLocation> CourseLocations { get; set; }
        /// <summary>
        /// Obtiene o establece CourseTypes.
        /// </summary>
        public DbSet<CourseType> CourseTypes { get; set; }
        /// <summary>
        /// Obtiene o establece ClassRooms.
        /// </summary>
        public DbSet<ClassRoom> ClassRooms { get; set; }
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

        #endregion

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
        public DbSet<EmployeeExtraHour> EmployeeExtraHours { get; set; }
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

        // Audit trail for compliance (ISO 27001)
        /// <summary>
        /// Obtiene o establece AuditLogs.
        /// </summary>
        public DbSet<AuditLog> AuditLogs { get; set; }
    }
}
