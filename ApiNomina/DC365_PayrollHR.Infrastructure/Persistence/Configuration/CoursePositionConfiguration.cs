/// <summary>
/// Configuración de Entity Framework para CoursePosition.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad CoursePosition.
    /// </summary>
    public class CoursePositionConfiguration : IEntityTypeConfiguration<CoursePosition>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<CoursePosition> builder)
        {
            builder.HasKey(x => new { x.CourseId, x.PositionId });

            builder.Property(x => x.Comment)
                .HasMaxLength(300)
                .IsRequired();

            builder.HasOne<Course>()
               .WithMany()
               .HasForeignKey(x => x.CourseId)
               .IsRequired();

            builder.HasOne<Position>()
               .WithMany()
               .HasForeignKey(x => x.PositionId)
               .IsRequired();
        }
    }
}
