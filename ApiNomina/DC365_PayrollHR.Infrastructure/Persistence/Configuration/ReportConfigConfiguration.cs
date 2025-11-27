/// <summary>
/// Configuración de Entity Framework para ReportConfig.
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
    /// Configuracion de entidad ReportConfig.
    /// </summary>
    public class ReportConfigConfiguration : IEntityTypeConfiguration<ReportConfig>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<ReportConfig> builder)
        {
            builder.HasKey(x => x.InternalId);

            builder.Property(x => x.Salary).HasMaxLength(20);
            builder.Property(x => x.SFS).HasMaxLength(20);
            builder.Property(x => x.LoanCooperative).HasMaxLength(20);
            builder.Property(x => x.DeductionCooperative).HasMaxLength(20);
            builder.Property(x => x.Comission).HasMaxLength(20);
            builder.Property(x => x.AFP).HasMaxLength(20);
        }
    }
}
