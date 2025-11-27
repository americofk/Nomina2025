/// <summary>
/// Configuración de Entity Framework para Instructor.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad Instructor.
    /// </summary>
    public class InstructorConfiguration : IEntityTypeConfiguration<Instructor>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Instructor> builder)
        {
            builder.HasKey(x => x.InstructorId);
            builder.Property(x => x.InstructorId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.IntructorId),'INT-00000000#')")
                .HasMaxLength(20);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Phone).HasMaxLength(20);
            builder.Property(x => x.Mail).HasMaxLength(100);
            builder.Property(x => x.Company).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Comment).HasMaxLength(100);
        }
    }
}
