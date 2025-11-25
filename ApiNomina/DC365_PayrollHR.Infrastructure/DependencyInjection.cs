using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Infrastructure.Persistence;
using DC365_PayrollHR.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DC365_PayrollHR.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // Register audit interceptor for ISO 27001 compliance
            services.AddScoped<AuditInterceptor>();

            services.AddDbContext<ApplicationDBContext>((serviceProvider, options) =>
            {
                var auditInterceptor = serviceProvider.GetRequiredService<AuditInterceptor>();
                options.UseSqlServer(configuration["ConnectionStrings:Localhost"])
                       .AddInterceptors(auditInterceptor);
            });

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDBContext>());

            services.AddScoped<IEmailServices, EmailServices>();
            services.AddScoped<IConnectThirdServices, ConnectThirdServices>();
            return services;
        }
    }
}
