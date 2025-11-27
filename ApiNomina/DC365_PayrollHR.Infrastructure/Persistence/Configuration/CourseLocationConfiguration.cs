/// <summary>
/// Configuración de Entity Framework para CourseLocation.
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
    /// Configuracion de entidad CourseLocation.
    /// </summary>
    public class CourseLocationConfiguration : IEntityTypeConfiguration<CourseLocation>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<CourseLocation> builder)
        {
            builder.HasKey(x => x.CourseLocationId);
            builder.Property(x => x.CourseLocationId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.CourseLocationId),'CLT-00000000#')")
                .HasMaxLength(20);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Phone).HasMaxLength(20);
            builder.Property(x => x.Mail).HasMaxLength(100);
            builder.Property(x => x.Address).IsRequired().HasMaxLength(500);
            builder.Property(x => x.ContactName).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Comment).HasMaxLength(100);
        }
    }
}
