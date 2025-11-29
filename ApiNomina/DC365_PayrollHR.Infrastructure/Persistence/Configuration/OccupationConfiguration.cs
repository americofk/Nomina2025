/// <summary>
/// Configuración de Entity Framework para Occupation.
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
    /// Configuracion de entidad Occupation.
    /// </summary>
    public class OccupationConfiguration : IEntityTypeConfiguration<Occupation>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Occupation> builder)
        {
            builder.HasKey(x => x.OccupationId);
            builder.Property(x => x.OccupationId).HasMaxLength(80).IsRequired();

            builder.Property(x => x.Description).HasMaxLength(200);
        }
    }
}
