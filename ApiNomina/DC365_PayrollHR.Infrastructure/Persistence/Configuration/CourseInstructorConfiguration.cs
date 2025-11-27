/// <summary>
/// Configuración de Entity Framework para CourseInstructor.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad CourseInstructor.
    /// </summary>
    public class CourseInstructorConfiguration : IEntityTypeConfiguration<CourseInstructor>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<CourseInstructor> builder)
        {
            builder.HasKey(x => new { x.CourseId, x.InstructorId });

            builder.Property(x => x.Comment)
                .HasMaxLength(300)
                .IsRequired();

            builder.HasOne<Course>()
               .WithMany()
               .HasForeignKey(x => x.CourseId)
               .IsRequired();

            builder.HasOne<Instructor>()
               .WithMany()
               .HasForeignKey(x => x.InstructorId)
               .IsRequired();
        }
    }
}
