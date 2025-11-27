/// <summary>
/// Configuración de Entity Framework para EmployeeHistory.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad EmployeeHistory.
    /// </summary>
    public class EmployeeHistoryConfiguration : IEntityTypeConfiguration<EmployeeHistory>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeHistory> builder)
        {
            builder.HasKey(x => x.EmployeeHistoryId);
            builder.Property(x => x.EmployeeHistoryId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.EmployeeHistoryId),'EH-00000000#')")
                .HasMaxLength(20);

            builder.Property(x => x.RegisterDate).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(200).IsRequired();
            builder.Property(x => x.Type).HasMaxLength(5).IsRequired();

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();
        }
    }
}
