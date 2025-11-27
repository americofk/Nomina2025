/// <summary>
/// Configuración de Entity Framework para FormatCode.
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
    /// Configuracion de entidad FormatCode.
    /// </summary>
    public class FormatCodeConfiguration : IEntityTypeConfiguration<FormatCode>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<FormatCode> builder)
        {
            builder.HasKey(x => x.FormatCodeId);
            builder.Property(x => x.FormatCodeId).ValueGeneratedNever();

            builder.Property(x => x.FormatCodeId).IsRequired().HasMaxLength(5);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(15);

        }
    }
}
