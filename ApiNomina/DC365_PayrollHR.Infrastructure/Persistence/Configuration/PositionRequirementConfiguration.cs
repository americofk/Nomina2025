/// <summary>
/// Configuración de Entity Framework para PositionRequirement.
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
    /// Configuracion de entidad PositionRequirement.
    /// </summary>
    public class PositionRequirementConfiguration : IEntityTypeConfiguration<PositionRequirement>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<PositionRequirement> builder)
        {
            builder.HasKey(x => new { x.Name, x.PositionId });
            builder.Property(x => x.Name).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Detail).IsRequired().HasMaxLength(100);

            //ForeignKey With PositionEntity
            //Without navigation property
            builder.HasOne<Position>()
                .WithMany()
                .HasForeignKey(x => x.PositionId)
                .IsRequired();
        }
    }
}
