/// <summary>
/// Configuración de Entity Framework para Country.
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
    /// Configuracion de entidad Country.
    /// </summary>
    public class CountryConfiguration : IEntityTypeConfiguration<Country>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.HasKey(x => x.CountryId);

            builder.Property(x => x.CountryId).HasMaxLength(20).IsRequired();
            builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
        }
    }
}
