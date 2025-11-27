/// <summary>
/// Configuración de Entity Framework para BatchHistory.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad BatchHistory.
    /// </summary>
    public class BatchHistoryConfiguration : IEntityTypeConfiguration<BatchHistory>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<BatchHistory> builder)
        {
            builder.HasKey(x => x.InternalId);
            builder.Property(x => x.Information).HasColumnType(ColumnTypeConst.maxvarchartype);
        }
    }
}
