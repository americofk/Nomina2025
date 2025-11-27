/// <summary>
/// Configuración de Entity Framework para User.
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
    /// Configuracion de entidad User.
    /// </summary>
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Alias);
            builder.Property(x => x.Alias).ValueGeneratedNever().IsRequired().HasMaxLength(10);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(200);

            builder.Property(x => x.Password).IsRequired();

            builder.HasOne<FormatCode>().WithMany().HasForeignKey(x => x.FormatCodeId).IsRequired();
            builder.HasOne<Company>().WithMany().HasForeignKey(x => x.CompanyDefaultId);
        }
    }
}
