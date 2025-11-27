/// <summary>
/// Configuración de Entity Framework para EarningCodeVersion.
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
    /// Configuracion de entidad EarningCodeVersion.
    /// </summary>
    public class EarningCodeVersionConfiguration : IEntityTypeConfiguration<EarningCodeVersion>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EarningCodeVersion> builder)
        {
            builder.HasKey(x => x.InternalId);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.ProjId).HasMaxLength(20);
            builder.Property(x => x.Department).HasMaxLength(20);
            builder.Property(x => x.LedgerAccount).HasMaxLength(30);
            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(200);

            builder.HasOne<EarningCode>()
                .WithMany()
                .HasForeignKey(x => x.EarningCodeId)
                .IsRequired();
        }
    }
}
