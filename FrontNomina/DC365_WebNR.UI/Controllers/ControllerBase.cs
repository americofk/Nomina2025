/// <summary>
/// Clase base para todos los controladores de la aplicación.
/// Proporciona funcionalidades comunes como gestión de sesión de usuario,
/// obtención de datos de layout y generación de listas desplegables.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;


namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Clase base para ControllerBase.
    /// </summary>
    [TypeFilter(typeof(LicenseFilter))]
    public class ControllerBase : Controller
    {
        /// <summary>
        /// Usuario.
        /// </summary>
        public List<string> dataUser { get; set; }


        /// <summary>


        /// Obtiene.


        /// </summary>


        public void GetdataUser()
        {
            dataUser = new List<string>();
            dataUser.Add(HttpContext.Session.GetString("Token"));
            dataUser.Add(HttpContext.Session.GetString("NameUser"));
            dataUser.Add(HttpContext.Session.GetString("NameCompanies"));
            dataUser.Add(HttpContext.Session.GetString("CodeCompanies"));
            dataUser.Add(HttpContext.Session.GetString("LisCompanies"));
            dataUser.Add(HttpContext.Session.GetString("FormatCode"));
            dataUser.Add(HttpContext.Session.GetString("Avatar"));
            dataUser.Add(HttpContext.Session.GetString("Email"));
            dataUser.Add(HttpContext.Session.GetString("Alias"));
            dataUser.Add(HttpContext.Session.GetString("CodeDefaultCompanies"));
            dataUser.Add(HttpContext.Session.GetString("Menu"));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        protected async Task GetLayoutDefauld()
        {
            ViewBag.NombreUsuario = dataUser[1];
            ViewBag.empresa = dataUser[3];
            ViewBag.Culture = dataUser[5];
            ViewBag.nameCompany = dataUser[2];
            ViewBag.Avatar = dataUser[6];
            ViewBag.Email = dataUser[7];
            //ViewData["menuLeft"] = new HtmlString(consultaMenu());
            ViewData["menuLeft"] = new HtmlString(dataUser[10]);
            ViewData["ListCompanyUser"] = JsonConvert.DeserializeObject<List<CompanyForUser>>(dataUser[4]);
            ViewBag.FormatCode = await selectListsDropDownList(SelectListOptions.FormatCode);
            ViewBag.companyDefault = await selectListsDropDownList(SelectListOptions.Company);
        }

        /// <summary>

        /// Ejecuta la operacion consultaMenu.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        public string consultaMenu()
        {
            Menu menuLeft = new Menu(dataUser[0]);
            var menu = menuLeft.ResultMenuLeft().Result;

            return menu.Obj;
        }


        /// <summary>


        /// Selecciona.


        /// </summary>


        /// <param name="_options">Parametro _options.</param>


        /// <param name="parms">Parametro parms.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<List<SelectListItem>> selectListsDropDownList(SelectListOptions _options, object parms = null)
        {
            
            List<SelectListItem> dropDownList = new List<SelectListItem>();
            switch (_options)
            {
                case SelectListOptions.Position:
                    ProcessPosition processPosition = new ProcessPosition(dataUser[0]);
                    var positions = await processPosition.GetAllDataAsync(PageSize: 1000);

                    foreach (var item in positions)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.PositionId,
                            Text = item.PositionName
                        });
                    }
                    break;

                case SelectListOptions.PositionVacant:
                    ProcessVacants processVacants = new ProcessVacants(dataUser[0]);

                    var ProcessVacants = await processVacants.GetAllDataAsync(PageSize:1000);

                    foreach (var item in ProcessVacants)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.PositionId,
                            Text = item.PositionName
                        });
                    }
                    break;

                case SelectListOptions.FormatCode:
                    ProcessUser processUser = new ProcessUser(dataUser[0]);
                    var dato = await processUser.GetAllDataFormatCode();

                    foreach (var item in dato)
                    {
                        bool seleccionado;
                        if (item.FormatCodeId == dataUser[5])
                            seleccionado = true;
                        else
                            seleccionado = false;
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.FormatCodeId,
                            Text = item.Name,
                            Selected = seleccionado
                        });
                    }
                    break;

                case SelectListOptions.Currency:
                    ProcessCurrencies processCurrencies = new ProcessCurrencies(dataUser[0]);
                    var currencies = await processCurrencies.GetAllDataAsync();

                    foreach (var item in currencies)
                    {
                        //bool seleccionado;
                        //if (item.FormatCodeId == dataUser[5])
                        //    seleccionado = true;
                        //else
                        //    seleccionado = false;
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.CurrencyId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.Payroll:
                    ProcessPayroll processPayrolls = new ProcessPayroll(dataUser[0]);
                    var payrolls = await processPayrolls.GetAllDataAsync();

                    foreach (var item in payrolls)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.PayrollId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.Project:
                    ProcessProject processProjects = new ProcessProject(dataUser[0]);
                    var projects = await processProjects.GetAllDataAsync(PageSize:1000);

                    foreach (var item in projects)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.ProjId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.ProjCategory:
                    ProcessProjCategory processProjCategory = new ProcessProjCategory(dataUser[0]);
                    var projCategories = await processProjCategory.GetAllDataAsync(PageSize:1000);

                    foreach (var item in projCategories)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.ProjCategoryId,
                            Text = item.CategoryName
                        });
                    }
                    break;

                case SelectListOptions.PayCycles:
                    ProcessPayCycle processPayCycle = new ProcessPayCycle(dataUser[0]);
                    var paycycles = await processPayCycle.GetAllDataAsync((string)parms, PageSize:1000);

                    foreach (var item in paycycles)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.PayCycleId.ToString(),
                            Text = $"[ {item.PeriodStartDate.ToString("dd-MM-yyyy")} ] - [ {item.PeriodEndDate.Date.ToString("dd-MM-yyyy")} ]"
                        });
                    }
                    break;

                case SelectListOptions.Company:
                    var companies = JsonConvert.DeserializeObject<List<CompanyForUser>>(dataUser[4]);
                    foreach (var item in companies)
                    {
                        bool seleccionado;
                        if (item.companyId == dataUser[9])
                            seleccionado = true;
                        else
                            seleccionado = false;
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.companyId,
                            Text = item.name,
                            Selected = seleccionado
                        });
                    }
                    break;

                case SelectListOptions.Department:
                    ProcessDepartament processDepartament = new ProcessDepartament(dataUser[0]);
                    var list = await processDepartament.GetAllDataAsync(PageSize:1000);

                    foreach (var item in list)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.DepartmentId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.DeductionCode:
                    ProcessDeductionCode deductionCode = new ProcessDeductionCode(dataUser[0]);
                    var deductions = await deductionCode.GetAllDataAsync(PageSize:1000);

                    foreach (var item in deductions)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.DeductionCodeId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.Loan:
                    ProcessLoan processLoan = new ProcessLoan(dataUser[0]);
                    var loans = await processLoan.GetAllDataAsync(PageSize:1000);

                    foreach (var item in loans)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.LoanId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.Tax:
                    ProcessTax processtax = new ProcessTax(dataUser[0]);
                    var taxs = await processtax.GetAllDataAsync();

                    foreach (var item in taxs)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.TaxId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.Job:
                    ProcessJob processJob = new ProcessJob(dataUser[0]);
                    var jobs = await processJob.GetAllDataAsync(PageSize:1000);

                    foreach (var item in jobs)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.JobId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.EarningCode:
                    ProcessEarningCodes processEarning = new ProcessEarningCodes(dataUser[0]);
                    var earningcodes = await processEarning.GetAllDataAsync(PageSize:1000);

                    foreach (var item in earningcodes)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.EarningCodeId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.EarningCodehours:
                    ProcessEarningCodes processEarninghours = new ProcessEarningCodes(dataUser[0]);
                    var Earninghours = await processEarninghours.GetAllExtraHourDataAsync();

                    foreach (var item in Earninghours)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.EarningCodeId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.EarningCodeEarning:
                    ProcessEarningCodes processEarningCodes = new ProcessEarningCodes(dataUser[0]);
                    var earning = await processEarningCodes.GetAllEarningCodeDataAsync(PageSize:1000);

                    foreach (var item in earning)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.EarningCodeId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.CourseType:
                    ProcessCourseType courseType = new ProcessCourseType(dataUser[0]);
                    var CourseTypes = await courseType.GetAllDataAsync(PageSize:1000);

                    foreach (var item in CourseTypes)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.CourseTypeId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.CourseParentId:
                    ProcessCourse courseParentId = new ProcessCourse(dataUser[0]);
                    var courseParentIds = await courseParentId.GetAllDataAsync(PageSize:1000);

                    foreach (var item in courseParentIds)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.CourseId,
                            Text = item.CourseName
                        });
                    }
                    break;

                case SelectListOptions.ClassRoomId:
                    ProcessClassRoom classRoomId = new ProcessClassRoom(dataUser[0]);
                    var classRoomIds = await classRoomId.GetAllDataAsync(PageSize:1000);

                    foreach (var item in classRoomIds)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.ClassRoomId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.InstructorId:
                    ProcessInstructor InstructorId = new ProcessInstructor(dataUser[0]);
                    var InstructorIds = await InstructorId.GetAllDataAsync(PageSize:1000);

                    foreach (var item in InstructorIds)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.InstructorId,
                            Text = item.Name
                        });
                    }
                    break;

                case SelectListOptions.EmployeeId:
                    ProcessEmployee EmployeeId = new ProcessEmployee(dataUser[0]);
                    var EmployeeIds = await EmployeeId.GetAllDataAsync("Employ", PageSize:1000);

                    foreach (var item in EmployeeIds)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.EmployeeId,
                            Text = $"{item.Name} {item.LastName}"
                        });
                    }
                    break;

                case SelectListOptions.Country:
                    ProcessCountries countries = new ProcessCountries(dataUser[0]);
                    var Countries = await countries.GetAllDataAsync();

                    foreach (var item in Countries)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.CountryId,
                            Text = $"{item.Name} - {item.NationalityCode} - {item.NationalityName} "
                        });
                    }
                    break;

                case SelectListOptions.Occupation:
                    ProcessCatalog Occupation = new ProcessCatalog(dataUser[0]);
                    var Occupations = await Occupation.GetAllDataOccupations();

                    foreach (var item in Occupations)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.OccupationId,
                            Text = item.Description
                        });
                    }
                    break;

                case SelectListOptions.EducationLevel:
                    ProcessCatalog Educationlevel = new ProcessCatalog(dataUser[0]);
                    var Educationlevels = await Educationlevel.GetAllDataEducationlevels();

                    foreach (var item in Educationlevels)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.EducationLevelId,
                            Text = item.Description
                        });
                    }
                    break;

                case SelectListOptions.DisabilityType:
                    ProcessCatalog Disabilitytype = new ProcessCatalog(dataUser[0]);
                    var Disabilitytypes = await Disabilitytype.GetAllDataDisabilitytypes();

                    foreach (var item in Disabilitytypes)
                    {
                        bool seleccionado;
                        if (item.Description == "Ninguna")
                            seleccionado = true;
                        else
                            seleccionado = false;
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.DisabilityTypeId,
                            Text = item.Description,
                            Selected = seleccionado
                        });
                    }
                    break;

                case SelectListOptions.Province:
                    ProcessProvince processprovince = new ProcessProvince(dataUser[0]);
                    var provinces = await processprovince.GetAllDataAsync();

                    foreach (var item in provinces)
                    {
                        dropDownList.Add(new SelectListItem
                        {
                            Value = item.ProvinceId,
                            Text = item.Name,
                        });
                    }
                    break;
            }
            return dropDownList;
        }


        /// <summary>


        /// Ejecuta CountriesDownList de forma asincrona.


        /// </summary>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("paises")]
        public async Task<JsonResult> CountriesDownList()
        {
            GetdataUser();
            ProcessCountries countries = new ProcessCountries(dataUser[0]);
            var list = await countries.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Ejecuta DepartmentDropDownList de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("departamento")]
        public async Task<JsonResult> DepartmentDropDownList()
        {
            GetdataUser();
            ProcessDepartament ProcesscourseType = new ProcessDepartament(dataUser[0]);
            var list = await ProcesscourseType.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Ejecuta Listdepartamentos de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("Buscardepartamentos")]
        public async Task<JsonResult> Listdepartamentos()
        {
            GetdataUser();
            ProcessDepartament processDepartament = new ProcessDepartament(dataUser[0]);
            var list = await processDepartament.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Ejecuta PaycyleDropDownList de forma asincrona.

        /// </summary>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("ciclospago/{payrollid}")]
        public async Task<JsonResult> PaycyleDropDownList(string payrollid)
        {
            GetdataUser();
            ProcessPayCycle process = new ProcessPayCycle(dataUser[0]);
            var list = await process.GetAllDataAsync(payrollid);
            return Json(list);
        }

        /// <summary>

        /// Ejecuta PaycyleDropDownList de forma asincrona.

        /// </summary>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <param name="payCycleId">Parametro payCycleId.</param>

        /// <param name="typePayroll">Parametro typePayroll.</param>

        /// <param name="qtyPeriodForPaid">Parametro qtyPeriodForPaid.</param>

        /// <param name="totalDues">Parametro totalDues.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("ciclospago/{payrollid}/{payCycleId}/{typePayroll}/{qtyPeriodForPaid}/{totalDues}")]
        public async Task<JsonResult> PaycyleDropDownList(string payrollid, int payCycleId, PayFrecuency typePayroll, int qtyPeriodForPaid, int totalDues)
        {
            GetdataUser();
            ProcessPayCycle process = new ProcessPayCycle(dataUser[0]);
            var list = await process.GetAllDataAsync(payrollid);
            var dato = list.Where(x => x.PayCycleId == payCycleId).ToList();
           
            switch (typePayroll)
            {
                case PayFrecuency.Diary:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddDays(totalDues * qtyPeriodForPaid);

                    break;
                case PayFrecuency.Weekly:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddDays((totalDues * qtyPeriodForPaid)*7);
                    break;
                case PayFrecuency.TwoWeekly:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddDays((totalDues * qtyPeriodForPaid) * 14);

                    break;
                case PayFrecuency.BiWeekly:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddMonths(qtyPeriodForPaid - 1).AddDays(qtyPeriodForPaid % 2 == 0 ? 0 : 15);
                    for (int i = 1; i <= totalDues-1; i++)
                    {
                        dato[0].PayDate = dato[0].PayDate.AddMonths(qtyPeriodForPaid - 1).AddDays(qtyPeriodForPaid % 2 == 0 ? 0 : 15);
                    }
                    break;
                case PayFrecuency.Monthly:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddMonths(totalDues * qtyPeriodForPaid);
                    break;
                case PayFrecuency.ThreeMonth:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddMonths((totalDues * qtyPeriodForPaid) * 3);

                    break;
                case PayFrecuency.FourMonth:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddMonths((totalDues * qtyPeriodForPaid) * 4);

                    break;
                case PayFrecuency.Biannual:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddMonths((totalDues * qtyPeriodForPaid) * 6);

                    break;
                case PayFrecuency.Yearly:
                    dato[0].PayDate = dato[0].PeriodStartDate.AddYears(totalDues * qtyPeriodForPaid);

                    break;
                default:
                    break;
            }
            return Json(dato);
        }
    }
}
