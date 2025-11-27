/// <summary>
/// Configuración de Entity Framework para EarningCode.
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
    /// Configuracion de entidad EarningCode.
    /// </summary>
    public class EarningCodeConfiguration : IEntityTypeConfiguration<EarningCode>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EarningCode> builder)
        {
            //builder.HasNoKey();
            builder.HasKey(x => x.EarningCodeId);
            builder.Property(x => x.EarningCodeId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'EC-00000000#')")
                    .HasMaxLength(20);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.ProjId).HasMaxLength(20);
            builder.Property(x => x.Department).HasMaxLength(20);
            builder.Property(x => x.LedgerAccount).HasMaxLength(30);
            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(200);

            builder.Property(x => x.IsHoliday);
            builder.Property(x => x.WorkFrom);
            builder.Property(x => x.WorkTo);

            //builder.Property(x => x.IndexBase).IsRequired();
            //builder.Property(x => x.MultiplyAmount).IsRequired();
            //builder.Property(x => x.LedgerAccount).IsRequired();
        }
    }
}
