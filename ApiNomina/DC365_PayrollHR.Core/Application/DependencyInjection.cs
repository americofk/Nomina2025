using DC365_PayrollHR.Core.Application.CommandsAndQueries;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Batchs;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.CalendarHolidays;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.ClassRooms;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Companies;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Countries;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseEmployees;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseInstructors;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseLocations;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.CoursePositions;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Courses;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseTypes;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Currencies;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Departments;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.DisabilityTypes;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EducationLevels;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeBankAccounts;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeContactsInf;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDeductionCodes;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDocuments;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeEarningCodes;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeExtraHours;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeHistories;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeLoans;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeePositions;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Employees;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeesAddress;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeTaxes;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeWorkCalendars;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeWorkControlCalendars;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.FormatCodes;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.GeneralConfigs;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Instructors;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Jobs;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.LicenseValidations;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Loans;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Login;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.MenusApp;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Occupations;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.PayCycles;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.PayrollProcessDetails;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.PayrollsProcess;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.PositionRequirements;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Positions;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.ProjCategories;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Projects;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Provinces;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.ReportsTXT;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.TaxDetails;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Taxes;
using DC365_PayrollHR.Core.Application.CommandsAndQueries.Users;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Model.Course;
using DC365_PayrollHR.Core.Application.Common.Model.CourseEmployees;
using DC365_PayrollHR.Core.Application.Common.Model.CourseInstructors;
using DC365_PayrollHR.Core.Application.Common.Model.CoursePositons;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeAddress;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeductionCodes;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDocuments;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeEarningCodes;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeExtraHours;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeLoans;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeTaxes;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkCalendars;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeWorkControlCalendars;
using DC365_PayrollHR.Core.Application.Common.Model.GeneralConfigs;
using DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Model.PayCycles;
using DC365_PayrollHR.Core.Application.Common.Model.Payrolls;
using DC365_PayrollHR.Core.Application.Common.Model.Provinces;
using DC365_PayrollHR.Core.Application.Common.Model.Reports;
using DC365_PayrollHR.Core.Application.Common.Model.Taxes;
using DC365_PayrollHR.Core.Application.Common.Model.Users;
using DC365_PayrollHR.Core.Application.StoreServices.DeductionCodes;
using DC365_PayrollHR.Core.Application.StoreServices.EarningCodes;
using DC365_PayrollHR.Core.Application.StoreServices.PayCycles;
using DC365_PayrollHR.Core.Application.StoreServices.Payrolls;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace DC365_PayrollHR.Core.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<ILoginCommandHandler, LoginCommandHandler>();
            services.AddScoped<IValidatePrivilege, ValidatePrivilege>();

            #region QueryHandlers

                #region Employee
                services.AddScoped<IQueryHandler<Employee>, EmployeeQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeeAddressResponse>, EmployeeAddressQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeeBankAccount>, EmployeeBankAccountQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeeContactInf>, EmployeeContactInfQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeeEarningCodeResponse>, EmployeeEarningCodeQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeeDeductionCodeResponse>, EmployeeDeductionCodeQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeePositionResponse>, EmployeePositionQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeeDocumentResponse>, EmployeeDocumentQueryHandler>();
                services.AddScoped<IQueryHandler<EmployeeLoanResponse>, EmployeeLoanQueryHandler>();                
                services.AddScoped<IQueryHandler<EmployeeLoanHistoryResponse>, EmployeeLoanHistoryQueryHandler>();                
                services.AddScoped<IQueryHandler<EmployeeTaxResponse>, EmployeeTaxQueryHandler>();                
                services.AddScoped<IQueryHandler<EmployeeExtraHourResponse>, EmployeeExtraHourQueryHandler>();                
                services.AddScoped<IQueryAllHandler<EmployeeHistoryResponse>, EmployeeHistoryQueryHandler>();                
                services.AddScoped<IQueryHandler<EmployeeWorkCalendarResponse>, EmployeeWorkCalendarQueryHandler>();                
                services.AddScoped<IQueryHandler<EmployeeWorkControlCalendarResponse>, EmployeeWorkControlCalendarQueryHandler>();                
                #endregion

                #region Courses
                services.AddScoped<IQueryHandler<CoursePositionResponse>, CoursePositionQueryHandler>();
                services.AddScoped<IQueryHandler<CourseInstructorResponse>, CourseInstructorQueryHandler>();
                services.AddScoped<IQueryHandler<CourseEmployeeResponse>, CourseEmployeeQueryHandler>();
                services.AddScoped<IQueryHandler<CourseResponse>, CourseQueryHandler>();
                services.AddScoped<IQueryHandler<ClassRoom>, ClassRoomQueryHandler>();
                services.AddScoped<IQueryHandler<CourseType>, CourseTypeQueryHandler>();
                services.AddScoped<IQueryHandler<CourseLocation>, CourseLocationQueryHandler>();
                services.AddScoped<IQueryHandler<Instructor>, InstructorQueryHandler>();
                #endregion

                #region Generals
                services.AddScoped<IQueryHandler<FormatCode>, FormatCodeQueryHandler>();
                services.AddScoped<IMenuAppQueryHandler, MenuAppQueryHandler>();
                services.AddScoped<IQueryAllWithoutSearchHandler<Country>, CountryQueryHandler>();
                services.AddScoped<ICompanyQueryHandler, CompanyQueryHandler>();
                services.AddScoped<IQueryAllWithoutSearchHandler<Currency>, CurrencyQueryHandler>();
                services.AddScoped<IDashboardInfoQueryHandler, DashboardInfoQueryHandler>();
                services.AddScoped<IQueryHandler<TaxResponse>, TaxQueryHandler>();
                services.AddScoped<IQueryHandler<TaxDetail>, TaxDetailQueryHandler>();
                services.AddScoped<IQueryHandler<Project>, ProjectQueryHandler>();
                services.AddScoped<IQueryHandler<ProjCategory>, ProjCategoryQueryHandler>();
                services.AddScoped<IQueryAllHandler<ProvinceResponse>, ProvinceQueryHandler>();
                #endregion

                #region Users
                services.AddScoped<IQueryAllHandler<MenuToUserResponse>, MenuToUserQueryHandler>();
                services.AddScoped<IQueryAllHandler<CompanyToUserResponse>, CompanyToUserQueryHandler>();
                services.AddScoped<IQueryHandler<UserResponse>, UserQueryHandler>();
                #endregion

                #region Positions & Jobs
                services.AddScoped<IQueryHandler<Position>, PositionQueryHandler>();
                services.AddScoped<IQueryHandler<Job>, JobQueryHandler>();
                services.AddScoped<IQueryHandler<PositionRequirement>, PositionRequirementQueryHandler>();
                #endregion

                services.AddScoped<IQueryAllHandler<PayrollProcessAction>, PayrollProcessActionQueryHandler>(); 
                services.AddScoped<IQueryHandler<PayrollResponse>, PayrollQueryHandler>(); 
                services.AddScoped<IQueryHandler<PayrollProcessDetail>, PayrollProcessDetailQueryHandler>(); 
                services.AddScoped<IPayrollProcessQueryHandler, PayrollProcessQueryHandler>();
                services.AddScoped<IQueryHandler<PayCycleResponse>, PayCycleQueryHandler>();
                services.AddScoped<IQueryAllHandler<EarningCodeVersion>, EarningCodeVersionQueryHandler>();
                services.AddScoped<IQueryHandler<DeductionCodeVersion>, DeductionCodeVersionQueryHandler>();
                services.AddScoped<IEarningCodeQueryHandler, EarningCodeQueryHandler>();
                services.AddScoped<IQueryHandler<DeductionCode>, DeductionCodeQueryHandler>();
                services.AddScoped<IQueryHandler<Department>, DepartmentQueryHandler>();
                services.AddScoped<IQueryHandler<Loan>, LoanQueryHandler>();
                services.AddScoped<IQueryAllHandler<BatchHistory>, ImportBatchDataQueryHandler>();
                services.AddScoped<IReportQueryHandler, ReportQueryHandler>();
                services.AddScoped<IQueryAllHandler<ReportConfig>, ReportConfigQueryHandler>();
                services.AddScoped<IQueryAllWithoutSearchHandler<Occupation>, OccupationQueryHandler>();
                services.AddScoped<IQueryAllWithoutSearchHandler<EducationLevel>, EducationLevelQueryHandler>();
                services.AddScoped<IQueryAllWithoutSearchHandler<DisabilityType>, DisabilityTypeQueryHandler>();
                services.AddScoped<IDGTTxtQueryHandler, DGTTxtQueryHandler>();

                services.AddScoped<IQueryAllHandler<CalendarHoliday>, CalendarHolidayQueryHandler>();

                services.AddScoped<ILicenseValidationQueryHandler, LicenseValidationQueryHandler>();
                services.AddScoped<IQueryByIdHandler<GeneralConfigResponse>, GeneralConfigQueryHandler>();

            //services.AddScoped<IQueryWithSearchHandler<Loan>, LoanQueryHandler>();
            #endregion

            #region CommandHandler

                #region Users
            services.AddScoped<IMenuToUserCommandHandler, MenuToUserCommandHandler>();
                services.AddScoped<ICompanyToUserCommandHandler, CompanyToUserCommandHandler>();
                services.AddScoped<IUserCommandHandler, UserCommandHandler>();
                #endregion

                #region Employees
                services.AddScoped<IEmployeeEarningCodeCommandHandler, EmployeeEarningCodeCommandHandler>();
                services.AddScoped<IEmployeeDeductionCodeCommandHandler, EmployeeDeductionCodeCommandHandler>();
                services.AddScoped<IEmployeeCommandHandler, EmployeeCommandHandler>();
                services.AddScoped<IEmployeeAddressCommandHandler, EmployeeAddressCommandHandler>();
                services.AddScoped<IEmployeeContactInfCommandHandler, EmployeeContactInfCommandHandler>();
                services.AddScoped<IEmployeeBankAccountCommandHandler, EmployeeBankAccountCommandHandler>();
                services.AddScoped<IEmployeePositionCommandHandler, EmployeePositionCommandHandler>();
                services.AddScoped<IEmployeeDocumentCommandHandler, EmployeeDocumentCommandHandler>();
                services.AddScoped<IEmployeeLoanCommandHandler, EmployeeLoanCommandHandler>();
                services.AddScoped<IEmployeeTaxCommandHandler, EmployeeTaxCommandHandler>();
                services.AddScoped<IEmployeeExtraHourCommandHandler, EmployeeExtraHourCommandHandler>();
                services.AddScoped<IEmployeeHistoryCommandHandler, EmployeeHistoryCommandHandler>();
                services.AddScoped<IEmployeeWorkCalendarCommandHandler, EmployeeWorkCalendarCommandHandler>();
                services.AddScoped<IEmployeeWorkControlCalendarCommandHandler, EmployeeWorkControlCalendarCommandHandler>();
                #endregion

                #region Courses
                services.AddScoped<ICoursePositionCommandHandler, CoursePositionCommandHandler>();
                services.AddScoped<ICourseEmployeeCommandHandler, CourseEmployeeCommandHandler>();
                services.AddScoped<ICourseTypeCommandHandler, CourseTypeCommandHandler>();
                services.AddScoped<ICourseLocationCommandHandler, CourseLocationCommandHandler>();
                services.AddScoped<IClassRoomCommandHandler, ClassRoomCommandHandler>();
                services.AddScoped<ICourseCommandHandler, CourseCommandHandler>();
                services.AddScoped<ICourseInstructorCommandHandler, CourseInstructorCommandHandler>();
                services.AddScoped<IInstructorCommandHandler, InstructorCommandHandler>();
                #endregion

                #region Positions & Jobs 
                services.AddScoped<IPositionCommandHandler, PositionCommandHandler>();
                services.AddScoped<IJobCommandHandler, JobCommandHandler>();
                services.AddScoped<IPositionRequirementCommandHandler, PositionRequirementCommandHandler>();
                #endregion

                services.AddScoped<IPayrollCommandHandler, PayrollCommandHandler>();
                services.AddScoped<IPayrollProcessCommandHandler, PayrollProcessCommandHandler>();
                services.AddScoped<IEarningCodeCommandHandler, EarningCodeCommandHandler>();
                services.AddScoped<IDeductionCodeCommandHandler, DeductionCodeCommandHandler>();
                services.AddScoped<IPayCycleCommandHandler, PayCycleCommandHandler>();
                services.AddScoped<IDepartmentCommandHandler, DepartmentCommandHandler>();         
                services.AddScoped<ITaxCommandHandler, TaxCommandHandler>();         
                services.AddScoped<ITaxDetailCommandHandler, TaxDetailCommandHandler>();         
                services.AddScoped<IProjectCommandHandler, ProjectCommandHandler>();         
                services.AddScoped<IProjCategoryCommandHandler, ProjCategoryCommandHandler>();         
                services.AddScoped<ILoanCommandHandler, LoanCommandHandler>();  
                services.AddScoped<ICompanyCommandHandler, CompanyCommandHandler>();  
            
                services.AddScoped<IImportBatchDataCommandHandler, ImportBatchDataCommandHandler>();
            
                services.AddScoped<ICreateCommandHandler<ReportConfigRequest>, ReportConfigCommandHandler>();

                services.AddScoped<ICalendarHolidayCommandHandler, CalendarHolidayCommandHandler>(); 
                services.AddScoped<IGeneralConfigCommandHandler, GeneralConfigCommandHandler>(); 
                services.AddScoped<IReportCommandHandler, ReportCommandHandler>(); 
            

            #endregion

            return services;
        }
        
    }
}
