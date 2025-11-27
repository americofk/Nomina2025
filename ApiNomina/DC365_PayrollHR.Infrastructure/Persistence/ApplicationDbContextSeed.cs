/// <summary>
/// Contexto de base de datos para ApplicationDbContextSeed.
/// Gestiona la conexión y operaciones con la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Helper;
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
            //Insertar data en la tabla de menu
            List<MenuApp> menuApps = new List<MenuApp>()
            {
                new MenuApp(){ MenuId= MenuConst.ReportConfig, MenuName="Configuración", Description="Título de configuración", Icon="fa fa-setting", Action="Click"},
                new MenuApp(){ MenuId="MENU-0002", MenuName="Colaboradores", Description="Listado de colaboradores", Icon="fa fa-user", Action="Click", MenuFather=MenuConst.ReportConfig}
            };

            modelBuilder.Entity<MenuApp>().HasData(menuApps);

            //Insertar la empresa raiz
            Company company = new Company()
            {
                CompanyId = "Root",
                Name = "Empresa raiz",
                Email = "",
                Responsible = "Administrator"
            };

            modelBuilder.Entity<Company>().HasData(company);

            //Insertar códigos de formato
            List<FormatCode> formatCodes = new List<FormatCode>()
            {
                new FormatCode()  { FormatCodeId = "en-US", Name = "Estado Únidos"},
                new FormatCode()  { FormatCodeId = "es-ES", Name = "España"},
            };

            modelBuilder.Entity<FormatCode>().HasData(formatCodes);

            //Insertar usuario administrador global
            User user = new User()
            {
                Alias = "Admin",
                Name = "Admin",
                Email = "fflores@dynacorp365.com",
                Password = SecurityHelper.MD5("123456"),
                ElevationType = Core.Domain.Enums.AdminType.LocalAdmin,
                CompanyDefaultId = "Root",
                FormatCodeId = "en-US",
            };

            modelBuilder.Entity<User>().HasData(user);

            //Insertar monedas
            List<Currency> currencies = new List<Currency>()
            {
                new Currency()  { CurrencyId = "USD", Name = "Dólares"},
                new Currency()  { CurrencyId = "DOP", Name = "Pesos Dominicanos"},
            };

            modelBuilder.Entity<Currency>().HasData(currencies);

            //Insertar paises
            List<Country> countries = new List<Country>()
            {
                new Country()  {CountryId = "DOM", Name = "República Dominicana"},
                new Country()  {CountryId = "CH", Name = "Chile"},
            };

            modelBuilder.Entity<Country>().HasData(countries);
        }
    }
}
