/// <summary>
/// Contexto de base de datos para ApplicationDbContextSeed.
/// Gestiona la conexión y operaciones con la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence
{
    /// <summary>
    /// Clase para gestion de ApplicationDbContextSeed.
    /// </summary>
    public static class ApplicationDbContextSeed
    {
        /// <summary>
        /// Ejecuta la operacion Seed.
        /// </summary>
        /// <param name="modelBuilder">Parametro modelBuilder.</param>
        public static void Seed(ModelBuilder modelBuilder)
        {
            // ============================================================================
            // 1. PAÍSES
            // ============================================================================
            List<Country> countries = new List<Country>()
            {
                new Country() { CountryId = "DOM", Name = "República Dominicana", NationalityCode = "1", NationalityName = "DOMINICANA" },
                new Country() { CountryId = "USA", Name = "Estados Unidos", NationalityCode = "3", NationalityName = "ESTADOUNIDENSE" },
                new Country() { CountryId = "PER", Name = "Perú", NationalityCode = "2", NationalityName = "PERUANA" },
                new Country() { CountryId = "CH", Name = "Chile", NationalityCode = "11", NationalityName = "CHILENA" },
            };
            modelBuilder.Entity<Country>().HasData(countries);

            // ============================================================================
            // 2. PROVINCIAS (República Dominicana)
            // ============================================================================
            List<Province> provinces = new List<Province>()
            {
                new Province() { ProvinceId = "01", Name = "Distrito Nacional" },
                new Province() { ProvinceId = "02", Name = "Azua" },
                new Province() { ProvinceId = "03", Name = "Baoruco" },
                new Province() { ProvinceId = "04", Name = "Barahona" },
                new Province() { ProvinceId = "05", Name = "Dajabón" },
                new Province() { ProvinceId = "06", Name = "Duarte" },
                new Province() { ProvinceId = "07", Name = "Elías Piña" },
                new Province() { ProvinceId = "08", Name = "El Seibo" },
                new Province() { ProvinceId = "09", Name = "Espaillat" },
                new Province() { ProvinceId = "10", Name = "Independencia" },
                new Province() { ProvinceId = "11", Name = "La Altagracia" },
                new Province() { ProvinceId = "12", Name = "La Romana" },
                new Province() { ProvinceId = "13", Name = "La Vega" },
                new Province() { ProvinceId = "14", Name = "María Trinidad Sánchez" },
                new Province() { ProvinceId = "15", Name = "Monte Cristi" },
                new Province() { ProvinceId = "16", Name = "Pedernales" },
                new Province() { ProvinceId = "17", Name = "Peravia" },
                new Province() { ProvinceId = "18", Name = "Puerto Plata" },
                new Province() { ProvinceId = "19", Name = "Hermanas Mirabal" },
                new Province() { ProvinceId = "20", Name = "Samaná" },
                new Province() { ProvinceId = "21", Name = "San Cristóbal" },
                new Province() { ProvinceId = "22", Name = "San Juan" },
                new Province() { ProvinceId = "23", Name = "San Pedro de Macorís" },
                new Province() { ProvinceId = "24", Name = "Sánchez Ramírez" },
                new Province() { ProvinceId = "25", Name = "Santiago" },
                new Province() { ProvinceId = "26", Name = "Santiago Rodríguez" },
                new Province() { ProvinceId = "27", Name = "Valverde" },
                new Province() { ProvinceId = "28", Name = "Monseñor Nouel" },
                new Province() { ProvinceId = "29", Name = "Monte Plata" },
                new Province() { ProvinceId = "30", Name = "Hato Mayor" },
                new Province() { ProvinceId = "31", Name = "San José de Ocoa" },
                new Province() { ProvinceId = "32", Name = "Santo Domingo" },
            };
            modelBuilder.Entity<Province>().HasData(provinces);

            // ============================================================================
            // 3. TIPOS DE DISCAPACIDAD
            // ============================================================================
            List<DisabilityType> disabilityTypes = new List<DisabilityType>()
            {
                new DisabilityType() { DisabilityTypeId = "0", Description = "Ninguna" },
                new DisabilityType() { DisabilityTypeId = "285", Description = "Discapacidad Auditiva" },
                new DisabilityType() { DisabilityTypeId = "289", Description = "Discapacidad Visual" },
                new DisabilityType() { DisabilityTypeId = "290", Description = "Discapacidad Mental" },
                new DisabilityType() { DisabilityTypeId = "291", Description = "Discapacidad Física Motora" },
                new DisabilityType() { DisabilityTypeId = "1493", Description = "Discapacidad Intelectual" },
                new DisabilityType() { DisabilityTypeId = "1494", Description = "Discapacidad Visceral" },
                new DisabilityType() { DisabilityTypeId = "1495", Description = "Discapacidad Múltiple" },
            };
            modelBuilder.Entity<DisabilityType>().HasData(disabilityTypes);

            // ============================================================================
            // 4. MONEDAS
            // ============================================================================
            List<Currency> currencies = new List<Currency>()
            {
                new Currency() { CurrencyId = "USD", Name = "Dólares" },
                new Currency() { CurrencyId = "DOP", Name = "Pesos Dominicanos" },
            };
            modelBuilder.Entity<Currency>().HasData(currencies);

            // ============================================================================
            // 5. CÓDIGOS DE FORMATO
            // ============================================================================
            List<FormatCode> formatCodes = new List<FormatCode>()
            {
                new FormatCode() { FormatCodeId = "en-US", Name = "Estados Unidos" },
                new FormatCode() { FormatCodeId = "es-ES", Name = "España" },
                new FormatCode() { FormatCodeId = "es-DO", Name = "Dominicana" },
            };
            modelBuilder.Entity<FormatCode>().HasData(formatCodes);

            // ============================================================================
            // 6. MENÚS DEL SISTEMA
            // ============================================================================
            List<MenuApp> menuApps = new List<MenuApp>()
            {
                // Menús Principales (Padres)
                new MenuApp() { MenuId = "MENU-0006", MenuName = "Configuración", Description = "Titulo de configuracion", Action = "Click", Icon = "fa fa-gears", MenuFather = null, Sort = 5, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0018", MenuName = "Recursos humanos", Description = "Titulo de recursos humanos", Action = "Click", Icon = "fa fa-users", MenuFather = null, Sort = 1, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0026", MenuName = "Nóminas", Description = "Titulo", Action = "Click", Icon = "fa fa-briefcase", MenuFather = null, Sort = 2, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0027", MenuName = "Cursos", Description = "Titulo", Action = "Click", Icon = "fa fa-graduation-cap", MenuFather = null, Sort = 3, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0031", MenuName = "Reportes", Description = "Titulo", Action = "Click", Icon = "fa fa-list-alt", MenuFather = null, Sort = 4, IsViewMenu = true },

                // Submenús de Configuración (MENU-0006)
                new MenuApp() { MenuId = "MENU-0004", MenuName = "Nóminas", Description = "Listado de nominas", Action = "MNominas", Icon = "fa fa-briefcase", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0005", MenuName = "Usuarios", Description = "Lista de usuarios", Action = "MUser", Icon = "fa fa-users", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0019", MenuName = "Códigos de ganancias", Description = "Todos los códigos de ganancias", Action = "Earning-codes", Icon = "fa fa-money", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0020", MenuName = "Códigos de deducciones", Description = "Todos los códigos de deducciones", Action = "DeductionCode", Icon = "fa fa-minus-square", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0022", MenuName = "Proyectos", Description = "Todos los proyectos activos", Action = "Projects", Icon = "fa fa-folder", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0023", MenuName = "Categorías de proyectos", Description = "Todas las categorias de proyectos", Action = "PorjectCategory", Icon = "fa fa-signal", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0024", MenuName = "Préstamos", Description = "Todos los códigos de prestamos activos", Action = "LoansEnabled", Icon = "fa fa-suitcase", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0025", MenuName = "Impuestos", Description = "Todos los códigos de impuestos", Action = "TaxCode", Icon = "fa fa-calculator", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0030", MenuName = "Carga masiva", Description = "Opción para cargar datos de forma masiva", Action = "CargaMasiva", Icon = "fa fa-cloud-upload", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0057", MenuName = "Configuración de reportes", Description = "Configuración de reportes", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0069", MenuName = "Auditoría", Description = "Registros de auditoría ISO 27001", Action = "auditoria", Icon = "fa fa-history", MenuFather = "MENU-0006", Sort = 100, IsViewMenu = true },

                // Submenús de Recursos Humanos (MENU-0018)
                new MenuApp() { MenuId = "MENU-0002", MenuName = "Departamentos", Description = "Listado de departamentos activos", Action = "MDepartamentos", Icon = "fa fa-building-o", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0012", MenuName = "Cargos", Description = "Todos los Cargos activos", Action = "JobsEnable", Icon = "fa fa-sitemap", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0014", MenuName = "Puestos", Description = "Todos los puestos activos", Action = "PositionEnabled", Icon = "fa fa-briefcase", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0016", MenuName = "Puestos vacantes", Description = "Todos los puestos vacantes", Action = "Vacants", Icon = "fa fa-cubes", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0017", MenuName = "Empleados", Description = "Todos los empleados", Action = "Employee", Icon = "fa fa-user", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0028", MenuName = "Empleados desvinculados", Description = "Ex empleados", Action = "DismissedEmployee", Icon = "fa fa-user-times", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0029", MenuName = "Prospectos a empleado", Description = "Empleados prospectos", Action = "EmployeeCandidate", Icon = "fa fa-user-plus", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0070", MenuName = "Prestaciones Laborales", Description = "Calculo de prestaciones laborales", Action = "prestacioneslaborales", Icon = "fa fa-money", MenuFather = "MENU-0018", Sort = 10, IsViewMenu = true },

                // Submenús de Nóminas (MENU-0026)
                new MenuApp() { MenuId = "MENU-0021", MenuName = "Proceso nómina", Description = "Procesos de nómina", Action = "ProcessPayroll", Icon = "fa fa-gears", MenuFather = "MENU-0026", Sort = 0, IsViewMenu = true },

                // Submenús de Cursos (MENU-0027)
                new MenuApp() { MenuId = "MENU-0007", MenuName = "Tipos de cursos", Description = "Tipos de cursos", Action = "TypeCourse", Icon = "fa fa-book", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0008", MenuName = "Instructores de cursos", Description = "Instructores de cursos", Action = "InstructorsCourse", Icon = "fa fa-group", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0009", MenuName = "Ubicación de cursos", Description = "Ubicación de cursos", Action = "CourseLocation", Icon = "fa fa-arrows-alt", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0010", MenuName = "Salones de cursos", Description = "Salones de cursos", Action = "ClassRoom", Icon = "fa fa-rebel", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0011", MenuName = "Cursos", Description = "Todos los cursos", Action = "Course", Icon = "fa fa-graduation-cap", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = true },

                // Submenús de Reportes (MENU-0031)
                new MenuApp() { MenuId = "MENU-0032", MenuName = "Recibos de nómina", Description = "Reportes de pagos de nomina", Action = "Pagosdenomina", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0033", MenuName = "Resumen de nómina", Description = "Reporte de resumen de nómina", Action = "DayrollSummary", Icon = "fa fa-file", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0034", MenuName = "Reporte de nómina", Description = "Reporte de nómina", Action = "PayrollReport", Icon = "fa fa-file-text", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0061", MenuName = "Reporte DGT-2", Description = "Reporte DGT-2", Action = "report-dgt2", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0062", MenuName = "Reporte DGT-3", Description = "Reporte DGT-3", Action = "report-dgt3", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0063", MenuName = "Reporte DGT-4", Description = "Reporte DGT-4", Action = "report-dgt4", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0064", MenuName = "Reporte DGT-5", Description = "Reporte DGT-5", Action = "report-dgt5", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0065", MenuName = "Reporte DGT-9", Description = "Reporte DGT-9", Action = "report-dgt9", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0066", MenuName = "Reporte DGT-11", Description = "Reporte DGT-11", Action = "report-dgt11", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },
                new MenuApp() { MenuId = "MENU-0067", MenuName = "Reporte DGT-12", Description = "Reporte DGT-12", Action = "report-dgt12", Icon = "fa fa-clipboard", MenuFather = "MENU-0031", Sort = 0, IsViewMenu = true },

                // Menús ocultos (IsViewMenu = false) para permisos internos
                new MenuApp() { MenuId = "MENU-0035", MenuName = "Departamentos inactivos", Description = "Departamentos inactivos", Action = null, Icon = "fa fa-building-o", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0036", MenuName = "Cargos inactivos", Description = "Cargos inactivos", Action = null, Icon = "fa fa-sitemap", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0037", MenuName = "Puestos inactivos", Description = "Puestos inactivos", Action = null, Icon = "fa fa-briefcase", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0038", MenuName = "Códigos de ganancias inactivos", Description = "Códigos de ganancias inactivos", Action = null, Icon = "fa fa-money", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0039", MenuName = "Códigos de deducciones inactivos", Description = "Códigos de deducciones inactivos", Action = null, Icon = "fa fa-money", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0040", MenuName = "Proyectos inactivos", Description = "Proyectos inactivos", Action = null, Icon = "fa fa-folder", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0041", MenuName = "Categorías de proyectos inactivas", Description = "Categorías de proyectos inactivas", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0042", MenuName = "Préstamos inactivo", Description = "Préstamos inactivo", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0043", MenuName = "Impuestos inactivos", Description = "Impuestos inactivos", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0006", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0044", MenuName = "Direcciones de empleados", Description = "Direcciones de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0045", MenuName = "Información de contacto de empleados", Description = "Información de contacto de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0046", MenuName = "Documentos de empleados", Description = "Documentos de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0047", MenuName = "Cuentas bancarias de empleados", Description = "Cuentas bancarias de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0048", MenuName = "Código de ganancias de empleados", Description = "Código de ganancias de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0049", MenuName = "Código de deducciones de empleados", Description = "Código de deducciones de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0050", MenuName = "Puestos de empleados", Description = "Puestos de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0051", MenuName = "Prestamos de empleados", Description = "Prestamos de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0052", MenuName = "Códigos de impuestos de empleados", Description = "Códigos de impuestos de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0053", MenuName = "Horas extras de empleados", Description = "Horas extras de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0054", MenuName = "Puestos de cursos", Description = "Puestos de cursos", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0055", MenuName = "Participantes de cursos", Description = "Participantes de cursos", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0056", MenuName = "Instructores de cursos asignados", Description = "Instructores de cursos asignados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0027", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0058", MenuName = "Empleados inactivos", Description = "Empleados inactivos", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0059", MenuName = "Requisitos de puestos", Description = "Requisitos de puestos", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0060", MenuName = "Imagen de empleados", Description = "Imagen de empleados", Action = null, Icon = "fa fa-signal", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
                new MenuApp() { MenuId = "MENU-0068", MenuName = "Historial de empleados", Description = "Historial de empleados", Action = "Employee-history", Icon = "fa-fa-clipboard", MenuFather = "MENU-0018", Sort = 0, IsViewMenu = false },
            };
            modelBuilder.Entity<MenuApp>().HasData(menuApps);

            // ============================================================================
            // 7. EMPRESA DAT (Empresa de prueba/demo)
            // ============================================================================
            Company company = new Company()
            {
                CompanyId = "DAT",
                Name = "Empresa Demo RH365",
                Email = "demo@rh365.com",
                Phone = "809-000-0000",
                Responsible = "Administrador",
                CountryId = "DOM",
                CurrencyId = "DOP",
                LicenseKey = "D365",
                Identification = "000000000",
                CompanyStatus = true
            };
            modelBuilder.Entity<Company>().HasData(company);

            // ============================================================================
            // 8. USUARIO ADMINISTRADOR
            // ============================================================================
            // Password: 12345678 -> MD5: 25d55ad283aa400af464c76d713c07ad
            User user = new User()
            {
                Alias = "AdminRH365",
                Name = "Administrador del Sistema",
                Email = "admin@rh365.com",
                Password = SecurityHelper.MD5("12345678"),
                ElevationType = Core.Domain.Enums.AdminType.AdministradorLocal,
                CompanyDefaultId = "DAT",
                FormatCodeId = "es-DO",
                TemporaryPassword = "",
                DateTemporaryPassword = new DateTime(2025, 1, 1)
            };
            modelBuilder.Entity<User>().HasData(user);

            // ============================================================================
            // 9. ASIGNAR EMPRESA AL USUARIO ADMIN
            // ============================================================================
            CompaniesAssignedToUser companyAssigned = new CompaniesAssignedToUser()
            {
                CompanyId = "DAT",
                Alias = "AdminRH365"
            };
            modelBuilder.Entity<CompaniesAssignedToUser>().HasData(companyAssigned);

            // ============================================================================
            // 10. OCUPACIONES BÁSICAS
            // ============================================================================
            List<Occupation> occupations = new List<Occupation>()
            {
                new Occupation() { OccupationId = "01", Description = "NINGUNA" },
                new Occupation() { OccupationId = "1110", Description = "MIEMBROS DEL PODER EJECUTIVO Y LEGISLATIVO" },
                new Occupation() { OccupationId = "1120", Description = "DIRECTORES Y GERENTES GENERALES DE EMPRESAS" },
                new Occupation() { OccupationId = "1211", Description = "DIRECTORES DE FINANZAS" },
                new Occupation() { OccupationId = "1212", Description = "DIRECTORES DE RECURSOS HUMANOS" },
                new Occupation() { OccupationId = "2411", Description = "CONTADORES" },
                new Occupation() { OccupationId = "2511", Description = "ANALISTAS DE SISTEMAS" },
                new Occupation() { OccupationId = "2512", Description = "DESARROLLADORES DE SOFTWARE" },
                new Occupation() { OccupationId = "2513", Description = "DESARROLLADORES WEB Y MULTIMEDIA" },
                new Occupation() { OccupationId = "2514", Description = "PROGRAMADORES DE APLICACIONES" },
                new Occupation() { OccupationId = "4110", Description = "OFICINISTAS GENERALES" },
                new Occupation() { OccupationId = "4120", Description = "SECRETARIOS GENERALES" },
                new Occupation() { OccupationId = "5414", Description = "GUARDIAS DE SEGURIDAD" },
                new Occupation() { OccupationId = "9112", Description = "PERSONAL DE LIMPIEZA DE OFICINAS, HOTELES Y OTROS" },
                new Occupation() { OccupationId = "9621", Description = "MENSAJEROS, REPARTIDORES Y MALETEROS" },
            };
            modelBuilder.Entity<Occupation>().HasData(occupations);
        }
    }
}
