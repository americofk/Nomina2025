/// <summary>
/// Configuración de Entity Framework para Job.
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
    /// Configuracion de entidad Job.
    /// </summary>
    public class JobConfiguration : IEntityTypeConfiguration<Job>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            builder.HasKey(x => x.JobId);
            builder.Property(x => x.JobId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.JobId),'J-00000000#')")
                    .HasMaxLength(20);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Description).HasMaxLength(200);

        }
    }
}
