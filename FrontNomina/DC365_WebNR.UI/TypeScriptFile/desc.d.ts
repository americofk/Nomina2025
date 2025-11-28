////declare var popWindow;
declare var windows_message: (message: string, type: string, options?: any, buttons?: any) => void;
declare var showhelp;
declare var showimagehelp;
declare var Chart;
declare var InstaciateListener; //Plugin de fecha
declare var SendNotification;
declare function FormatErrors(data: any): void;
declare function redireccionaralLogin(xhr: any): void;
declare var isBusy: boolean;
declare function moredata(maxscroll: number, controller: string, tbody: string): void;
declare function showAuditModal(data: any): void;
declare function showAuditModalFromForm(): void;
declare function initAuditListPage(checkboxSelector: string, idCellSelector: string, apiUrl: string, idParamName?: string): void;
declare function formatAuditDateTime(dateString: string): string;

interface IRoles {
    Alias: string
    MenuId: string
    PrivilegeView?: boolean
    PrivilegeEdit?: boolean
    PrivilegeDelete?: boolean
    Description?: string
}

interface ICompanies {
    companyId: string
    name?: string
    Alias: string
    CompanyName?: string
}

interface IUsers {
    Alias: string
    Name: string
    Email: string
    FormatCodeId: string
    ElevationType: string
    ElevationTypeBool: boolean
    CompanyDefaultId?: string
}

interface ISendnewpassword {
    Email: string
    TemporaryPassword: string
    NewPassword: string
}

interface ICourseType {
    CourseTypeId?: string
    Name: string
    Description: string
}

interface IInstructor {
    InstructorId?: string
    Name: string
    Phone: string
    Mail: string
    Company: string
    Comment: string
}

interface ICourseLocation{
    CourseLocationId?: string
    Name: string
    Phone: string
    Mail: string
    Address: string
    ContactName: string
    Comment: string
}

interface IClassRoom{
    ClassRoomId?: string
    CourseLocationId: string
    Name: string
    MaxStudentQty: number
    AvailableTimeStart: number
    AvailableTimeEnd: number
    Comment: string
}

interface IDepartment {
    DepartmentId?: string
    Name: string
    QtyWorkers: number
    StartDate: string
    EndDate: string
    Description: string
    DepartmentStatus?: boolean
}

interface Course {
    CourseId?: string
    CourseName: string
    CourseTypeId: number
   /* CourseTypeName: string*/
    IsMatrixTraining: boolean
    InternalExternal: number
    CourseParentId?: string
    ClassRoomId?: string
    //ClassRoomName?: string
    StartDateTime?: Date
    EndDateTime?: Date
    MaxStudents?: number
    Periodicity?: number
    QtySessions?: number
    Description?: string
    Objetives?: string
    Topics?: string
    CourseStatus?: number
}

interface IJob {
    JobId?: string
    Name: string
    Description: string
}

interface IPosition {
    PositionId?: string
    PositionName: string
    IsVacant?: boolean
    DepartmentId: string
    JobId: string
    NotifyPositionId: string
    PositionStatus: boolean
    EndDate?: Date
    Description?: Date
}

interface IPositionRequirement {
    Name: string
    Detail: string
    PositionId: string
}

interface IEmployee {
    EmployeeId?: string
    Name: string
    LastName?: string
    PersonalTreatment: string
    BirthDate?: Date
    Gender: string
    Age: number
    DependentsNumbers: number
    MaritalStatus?: string
    NSS?: string
    ARS?: string
    AFP?: string
    AdmissionDate:Date
    Country:string
    EmployeeType:string
    HomeOffice:boolean
    OwnCar:boolean
    HasDisability:boolean
    WorkFrom:number
    WorkTo:number
    BreakWorkFrom:number
    BreakWorkTo:number
    EmployeeStatus: boolean
    StartWorkDate: Date
    EndWorkDate: Date
    PayMethod: string
}

interface EmployeeAddressTwo {
    InternalId?: string
    Street: string
    Home: string
    Sector: string
    City: string
    Province: string
    Comment: string
    IsPrincipal: boolean
    CountryId: string
}

interface IEarningCode {
    EarningCodeId?: string
    Name: string
    IsTSS: boolean
    IsISR: boolean
    ValidFrom: Date
    ValidTo: Date
    Description: string
    IsEnabled: boolean
    IndexBase: string
    MultiplyAmount: number
    LedgerAccount:string
    Department:string
}
interface IProject {
    ProjId?: string
    Name: string
    LedgerAccount: string
}

interface ICalendarHoliday {
    CalendarDate: Date
    Description: string
}

interface IProjCategory {
    ProjCategoryId?: string
    CategoryName: string
    LedgerAccount: string
}

interface IDeductionCode {
    DeductionCodeId?: string
    Name: string
    ProjId: string
    ProjCategory: string
    ValidFrom: Date
    ValidTo: Date
    Description: string
    IsEnabled: boolean
    LedgerAccount: string
    Department: string
    PayrollAction:string
    Ctbution_IndexBase: string
    Ctbution_PayFrecuency: string
    Ctbution_LimitPeriod: string
    Dduction_IndexBase: string
    Ctbution_MultiplyAmount: number
    Dduction_LimitAmount: number
}

//Objeto de cantidades para las tarjetas del dashboard
interface ICardQtyInfo {
    Employees: number,
    Departments: number,
    Positions: number,
    Courses: number
}

//Objeto para las gráficas del dashboard
interface IGraphicsInfo {
    EmployeeByDepartments: IDepartamentInfo,
    DtbutionCtbutionByYear: IDtionCtionInfo,
    AmountByAction: IActionAmountInfo,
    TrimestralPayrollAmount: ITrimestralPayrollAmount;
}

interface IDepartamentInfo {
    Keys: Array<string>,
    Values: Array<number>
}

interface IActionAmountInfo {
    Keys: Array<string>,
    Values: Array<number>
}

interface IDtionCtionInfo {
    CtbutionValues: Array<number>,
    DtbutionValues: Array<number>,
    Keys: Array<string>
}

interface ITrimestralPayrollAmount {
    FirtBar: Array<number>,
    SecondBar: Array<number>,
    ThirtBar: Array<number>,
    Keys: Array<string>
}
//Objeto para las gráficas del dashboard






//nomina
interface IPayroll{
    PayrollId: string,
    Name: string,
    PayFrecuency: string,
    ValidFrom: Date,
    ValidTo: Date
    Description: string
    IsRoyaltyPayroll: boolean
    CurrencyId: string
    PayCycleQty: number
}

