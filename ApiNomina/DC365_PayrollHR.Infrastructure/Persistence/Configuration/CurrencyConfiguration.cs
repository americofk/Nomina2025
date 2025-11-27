/// <summary>
/// Configuración de Entity Framework para Currency.
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
    /// Configuracion de entidad Currency.
    /// </summary>
    public class CurrencyConfiguration : IEntityTypeConfiguration<Currency>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Currency> builder)
        {
            builder.HasKey(x => x.CurrencyId);

            builder.Property(x => x.CurrencyId).HasMaxLength(5).IsRequired();
            builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
        }
    }
}
