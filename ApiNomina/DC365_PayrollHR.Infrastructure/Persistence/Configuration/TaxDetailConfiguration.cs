/// <summary>
/// Configuración de Entity Framework para TaxDetail.
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
    /// Configuracion de entidad TaxDetail.
    /// </summary>
    public class TaxDetailConfiguration : IEntityTypeConfiguration<TaxDetail>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<TaxDetail> builder)
        {
            builder.HasKey(x => new { x.InternalId, x.TaxId, x.DataAreaId });
            builder.Property(x => x.InternalId).ValueGeneratedNever();

            builder.HasOne<Tax>()
                .WithMany()
                .HasForeignKey(x => new { x.TaxId, x.DataAreaId })
                .IsRequired();
        }
    }
}
