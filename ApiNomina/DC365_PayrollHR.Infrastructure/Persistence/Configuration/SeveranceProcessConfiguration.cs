/// <summary>
/// Configuración de Entity Framework para SeveranceProcess.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuración de entidad SeveranceProcess.
    /// </summary>
    public class SeveranceProcessConfiguration : IEntityTypeConfiguration<SeveranceProcess>
    {
        /// <summary>
        /// Configura el mapeo de la entidad SeveranceProcess.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<SeveranceProcess> builder)
        {
            builder.HasKey(x => x.SeveranceProcessId);

            builder.Property(x => x.SeveranceProcessId)
                .HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.SeveranceProcessId),'PRES-00000000#')")
                .HasMaxLength(20);

            builder.Property(x => x.Description)
                .HasMaxLength(200);

            builder.Property(x => x.ProcessDate)
                .IsRequired();

            builder.Property(x => x.EmployeeQuantity)
                .HasDefaultValue(0);

            builder.Property(x => x.TotalPreaviso)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.TotalCesantia)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.TotalVacaciones)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.TotalNavidad)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.TotalGeneral)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.SeveranceProcessStatus)
                .HasDefaultValue(Core.Domain.Enums.SeveranceProcessStatus.Creado);

            // Ignorar la propiedad Details - no es una columna de BD
            builder.Ignore(x => x.Details);
        }
    }
}
