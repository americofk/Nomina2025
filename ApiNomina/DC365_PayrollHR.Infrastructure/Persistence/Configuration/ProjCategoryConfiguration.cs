/// <summary>
/// Configuración de Entity Framework para ProjCategory.
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
    /// Configuracion de entidad ProjCategory.
    /// </summary>
    public class ProjCategoryConfiguration : IEntityTypeConfiguration<ProjCategory>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<ProjCategory> builder)
        {
            builder.HasKey(x => x.ProjCategoryId);
            builder.Property(x => x.ProjCategoryId)
                .IsRequired()
                .HasMaxLength(20)
                .HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.ProjCategoryId),'PRJC-00000000#')");

            builder.Property(x => x.CategoryName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.LedgerAccount).HasMaxLength(20);
            builder.Property(x => x.ProjId).IsRequired().HasMaxLength(20);

            builder.HasOne(x => x.Project)
                .WithMany()
                .HasForeignKey(x => x.ProjId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
