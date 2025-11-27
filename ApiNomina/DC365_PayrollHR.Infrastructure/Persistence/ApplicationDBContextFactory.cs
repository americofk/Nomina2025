/// <summary>
/// Contexto de base de datos para ApplicationDBContextFactory.
/// Gestiona la conexión y operaciones con la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DC365_PayrollHR.Infrastructure.Persistence
{
    /// <summary>
    /// Design-time factory for EF Core migrations
    /// </summary>
    public class ApplicationDBContextFactory : IDesignTimeDbContextFactory<ApplicationDBContext>
    {
        /// <summary>
        /// Crea un nuevo registro.
        /// </summary>
        /// <param name="args">Parametro args.</param>
        /// <returns>Resultado de la operacion.</returns>
        public ApplicationDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDBContext>();
            optionsBuilder.UseSqlServer("Server=.;Database=DC365_PayrollDataApp;Trusted_Connection=true;TrustServerCertificate=true;");

            // Use a mock user information for design-time
            var mockUserInfo = new DesignTimeUserInformation();

            return new ApplicationDBContext(optionsBuilder.Options, mockUserInfo);
        }
    }

    /// <summary>
    /// Mock user information for design-time migrations
    /// </summary>
    internal class DesignTimeUserInformation : ICurrentUserInformation
    {
        public string Alias => "SYSTEM";
        public string Company => "DMMY";
        public string Email => "system@migration.local";
        public string ElevationType => "Admin";
        public bool IsLicenseValid => true;
    }
}
