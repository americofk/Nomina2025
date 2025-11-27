/// <summary>
/// Configuración de Entity Framework para EmployeeEarningCode.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad EmployeeEarningCode.
    /// </summary>
    public class EmployeeEarningCodeConfiguration : IEntityTypeConfiguration<EmployeeEarningCode>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeEarningCode> builder)
        {
            builder.HasKey(x => new { x.InternalId, x.EmployeeId });
            builder.Property(x => x.InternalId).ValueGeneratedNever();


            builder.Property(x => x.FromDate).IsRequired();
            builder.Property(x => x.ToDate).IsRequired();
            builder.Property(x => x.IndexEarning).IsRequired();
            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Comment)
                .HasMaxLength(200);

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();

            builder.HasOne<Payroll>()
                .WithMany()
                .HasForeignKey(x => x.PayrollId)
                .IsRequired();

            builder.HasOne<EarningCode>()
                .WithMany()
                .HasForeignKey(x => x.EarningCodeId)
                .IsRequired();
        }
    }
}
