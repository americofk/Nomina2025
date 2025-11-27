/// <summary>
/// Configuración de Entity Framework para PayrollProcessAction.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad PayrollProcessAction.
    /// </summary>
    public class PayrollProcessActionConfiguration : IEntityTypeConfiguration<PayrollProcessAction>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<PayrollProcessAction> builder)
        {
            builder.HasKey(x => new { x.InternalId, x.PayrollProcessId, x.EmployeeId });

            builder.Property(x => x.InternalId).IsRequired()
                .ValueGeneratedNever();

            builder.Property(x => x.PayrollActionType);
            builder.Property(x => x.ActionName).HasMaxLength(100).IsRequired();
            builder.Property(x => x.ActionId).HasMaxLength(25).IsRequired();
            builder.Property(x => x.ActionAmount).IsRequired();
            builder.Property(x => x.ApplyTax).IsRequired();
            builder.Property(x => x.ApplyTSS).IsRequired();

            builder.HasOne<PayrollProcess>()
                .WithMany()
                .HasForeignKey(x => x.PayrollProcessId)
                .IsRequired();

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();

        }
    }
}
