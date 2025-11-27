/// <summary>
/// Configuración de Entity Framework para Payroll.
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
    /// Configuracion de entidad Payroll.
    /// </summary>
    public class PayrollConfiguration : IEntityTypeConfiguration<Payroll>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Payroll> builder)
        {
            builder.HasKey(x => x.PayrollId);
            builder.Property(x => x.PayrollId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.PayrollId),'PAY-00000000#')")
                .HasMaxLength(20);
            
            //builder.Property(x => x.IdNomina).HasKey();
            builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();
            builder.Property(x => x.PayFrecuency).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(300);
            builder.Property(x => x.CurrencyId).HasMaxLength(5).IsRequired();

        }
    }
}
