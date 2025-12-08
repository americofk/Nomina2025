/// <summary>
/// Componente de infraestructura para DependencyInjection.
/// Implementa servicios de soporte para el sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Infrastructure.Persistence;
using DC365_PayrollHR.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DC365_PayrollHR.Infrastructure
{
    /// <summary>
    /// Clase para gestion de DependencyInjection.
    /// </summary>
    public static class DependencyInjection
    {
        /// <summary>
        /// Agrega un nuevo registro.
        /// </summary>
        /// <param name="services">Parametro services.</param>
        /// <param name="configuration">Parametro configuration.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDBContext>(options =>
                options.UseSqlServer(configuration["ConnectionStrings:Localhost"]));

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDBContext>());

            services.AddScoped<IEmailServices, EmailServices>();
            services.AddScoped<IConnectThirdServices, ConnectThirdServices>();
            return services;
        }
    }
}
