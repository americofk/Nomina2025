using DC365_PayrollHR.Core.Application.Common.Interface;
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

            //Añadir filtros globales
            //GlobalFilterConfiguration.ConfigureFilter(modelBuilder, _CurrentUserInformation.Company);
        }

        public override DatabaseFacade Database => base.Database;

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
        public DbSet<Payroll> Payrolls { get; set; }
        public DbSet<PayCycle> PayCycles { get; set; }
        public DbSet<EarningCode> EarningCodes { get; set; }
        public DbSet<EarningCodeVersion> EarningCodeVersions { get; set; }

        public DbSet<DeductionCode> DeductionCodes { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<PositionRequirement> PositionRequirements { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserImage> UserImages { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjCategory> ProjCategories { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        public DbSet<TaxDetail> TaxDetails { get; set; }

        public DbSet<FormatCode> FormatCodes { get; set; }
        public DbSet<CompaniesAssignedToUser> CompaniesAssignedToUsers { get; set; }
        public DbSet<MenuAssignedToUser> MenuAssignedToUsers { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<MenuApp> MenusApp { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Loan> Loans { get; set; }

        public DbSet<PayrollProcess> PayrollsProcess { get; set; }
        public DbSet<PayrollProcessDetail> PayrollProcessDetails { get; set; }
        public DbSet<PayrollProcessAction> PayrollProcessActions { get; set; }


        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeImage> EmployeeImages { get; set; }
        public DbSet<EmployeeAddress> EmployeesAddress { get; set; }
        public DbSet<EmployeeContactInf> EmployeeContactsInf { get; set; }
        public DbSet<EmployeeBankAccount> EmployeeBankAccounts { get; set; }
        public DbSet<EmployeeDocument> EmployeeDocuments { get; set; }
        public DbSet<EmployeeDepartment> EmployeeDepartments { get; set; }
        public DbSet<EmployeePosition> EmployeePositions { get; set; }
        public DbSet<EmployeeLoan> EmployeeLoans { get; set; }
        public DbSet<EmployeeTax> EmployeeTaxes { get; set; }
        public DbSet<DeductionCodeVersion> DeductionCodeVersions { get; set; }

        public DbSet<BatchHistory> BatchHistories { get; set; }
        public DbSet<EmployeeLoanHistory> EmployeeLoanHistories { get; set; }
        public DbSet<ReportConfig> ReportsConfig { get; set; }
        public DbSet<EmployeeHistory> EmployeeHistories { get; set; }

        public DbSet<DisabilityType> DisabilityTypes { get; set; }
        public DbSet<EducationLevel> EducationLevels { get; set; }
        public DbSet<Occupation> Occupations { get; set; }
        public DbSet<Province> Provinces { get; set; }

        #region Courses

        public DbSet<CourseLocation> CourseLocations { get; set; }
        public DbSet<CourseType> CourseTypes { get; set; }
        public DbSet<ClassRoom> ClassRooms { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<CourseInstructor> CourseInstructors { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CoursePosition> CoursePositions { get; set; }
        public DbSet<CourseEmployee> CourseEmployees { get; set; }

        #endregion

        public DbSet<EmployeeEarningCode> EmployeeEarningCodes { get; set; }
        public DbSet<EmployeeDeductionCode> EmployeeDeductionCodes { get; set; }
        public DbSet<EmployeeExtraHour> EmployeeExtraHours { get; set; }
        public DbSet<EmployeeWorkCalendar> EmployeeWorkCalendars { get; set; }
        public DbSet<CalendarHoliday> CalendarHolidays { get; set; }
        public DbSet<GeneralConfig> GeneralConfigs { get; set; }
        public DbSet<EmployeeWorkControlCalendar> EmployeeWorkControlCalendars { get; set; }

        // Audit trail for compliance (ISO 27001)
        public DbSet<AuditLog> AuditLogs { get; set; }
    }
}
