/// <summary>
/// Configuración de Entity Framework para GeneralConfig.
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
    /// Configuracion de entidad GeneralConfig.
    /// </summary>
    public class GeneralConfigConfiguration : IEntityTypeConfiguration<GeneralConfig>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<GeneralConfig> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Email).IsRequired().HasMaxLength(200);
            builder.Property(x => x.EmailPassword).IsRequired();
            builder.Property(x => x.SMTP).IsRequired().HasMaxLength(50);
            builder.Property(x => x.SMTPPort).IsRequired().HasMaxLength(10);
        }
    }
}
