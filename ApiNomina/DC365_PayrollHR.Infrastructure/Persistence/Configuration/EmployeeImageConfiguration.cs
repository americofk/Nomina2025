/// <summary>
/// Configuración de Entity Framework para EmployeeImage.
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
    /// Configuracion de entidad EmployeeImage.
    /// </summary>
    public class EmployeeImageConfiguration : IEntityTypeConfiguration<EmployeeImage>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeImage> builder)
        {
            builder.HasKey(x => x.EmployeeId);
            builder.Property(x => x.EmployeeId).ValueGeneratedNever();

            builder.Property(x => x.Extension).HasMaxLength(4).IsRequired();

        }
    }
}
