/// <summary>
/// Configuración de Entity Framework para ClassRoom.
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
    /// Configuracion de entidad ClassRoom.
    /// </summary>
    public class ClassRoomConfiguration : IEntityTypeConfiguration<ClassRoom>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<ClassRoom> builder)
        {
            builder.HasKey(x =>x.ClassRoomId);
            builder.Property(x => x.ClassRoomId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.ClassRoomId),'CR-00000000#')")
                .HasMaxLength(20);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.MaxStudentQty).IsRequired();
            builder.Property(x => x.Comment).HasMaxLength(100);
            builder.Property(x => x.AvailableTimeStart).IsRequired();
            builder.Property(x => x.AvailableTimeEnd).IsRequired();

            builder.HasOne<CourseLocation>()
                .WithMany()
                .HasForeignKey(x => x.CourseLocationId)
                .IsRequired();
        }
    }
}
