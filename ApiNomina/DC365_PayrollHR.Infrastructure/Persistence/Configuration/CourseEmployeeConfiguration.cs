/// <summary>
/// Configuración de Entity Framework para CourseEmployee.
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
    /// Configuracion de entidad CourseEmployee.
    /// </summary>
    public class CourseEmployeeConfiguration : IEntityTypeConfiguration<CourseEmployee>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<CourseEmployee> builder)
        {
            builder.HasKey(x => new { x.CourseId, x.EmployeeId });

            builder.Property(x => x.Comment)
                .HasMaxLength(300)
                .IsRequired();

            builder.HasOne<Course>()
               .WithMany()
               .HasForeignKey(x => x.CourseId)
               .IsRequired();

            builder.HasOne<Employee>()
               .WithMany()
               .HasForeignKey(x => x.EmployeeId)
               .IsRequired();
        }
    }
}
