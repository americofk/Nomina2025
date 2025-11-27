/// <summary>
/// Configuración de Entity Framework para Company.
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
    /// Configuracion de entidad Company.
    /// </summary>
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(x => x.CompanyId);
            builder.Property(x => x.CompanyId).ValueGeneratedNever().IsRequired().HasMaxLength(4);
                //.HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.CompanyId),'CPNY-00#')")
                //.HasMaxLength(8);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Phone).HasMaxLength(20);
            builder.Property(x => x.LicenseKey).HasMaxLength(500);
            builder.Property(x => x.Identification).HasMaxLength(50);

            builder.HasOne<Country>()
                .WithMany()
                .HasForeignKey(x => x.CountryId);

            builder.HasOne<Currency>()
                .WithMany()
                .HasForeignKey(x => x.CurrencyId);

        }
    }
}
