/// <summary>
/// Configuración de Entity Framework para EmployeeDocument.
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
    /// Configuracion de entidad EmployeeDocument.
    /// </summary>
    public class EmployeeDocumentConfiguration : IEntityTypeConfiguration<EmployeeDocument>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeDocument> builder)
        {
            builder.HasKey(x => new { x.EmployeeId, x.InternalId });
            builder.Property(x => x.InternalId).ValueGeneratedNever();

            builder.Property(x => x.DocumentType).HasMaxLength(100).IsRequired();
            builder.Property(x => x.DueDate).IsRequired();
            builder.Property(x => x.DocumentNumber).HasMaxLength(30).IsRequired();
            builder.Property(x => x.FileAttach);

            builder.Property(x => x.Comment).HasMaxLength(200);
            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();
        }
    }
}
