/// <summary>
/// Configuración de Entity Framework para DisabilityType.
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
    /// Configuracion de entidad DisabilityType.
    /// </summary>
    public class DisabilityTypeConfiguration : IEntityTypeConfiguration<DisabilityType>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<DisabilityType> builder)
        {
            builder.HasKey(x => x.DisabilityTypeId);
            builder.Property(x => x.DisabilityTypeId).HasMaxLength(20).IsRequired();

            builder.Property(x => x.Description).HasMaxLength(200);
        }
    }
}
