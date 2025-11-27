/// <summary>
/// Configuración de Entity Framework para Tax.
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
    /// Configuracion de entidad Tax.
    /// </summary>
    public class TaxConfiguration : IEntityTypeConfiguration<Tax>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Tax> builder)
        {
            builder.HasKey(x => new { x.TaxId, x.DataAreaId });
            builder.Property(x => x.TaxId)
                .HasMaxLength(20);

            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.LedgerAccount).HasMaxLength(30);
            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();
            builder.Property(x => x.Currency).HasMaxLength(5).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(200);
            builder.Property(x => x.LimitPeriod).HasMaxLength(20);


            builder.Property(x => x.ProjId).HasMaxLength(20);
            builder.Property(x => x.ProjCategory).HasMaxLength(20);
            builder.Property(x => x.DepartmentId).HasMaxLength(20);



        }
    }
}
