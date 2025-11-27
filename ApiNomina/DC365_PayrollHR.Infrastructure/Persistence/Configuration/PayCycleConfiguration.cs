/// <summary>
/// Configuración de Entity Framework para PayCycle.
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
    /// Configuracion de entidad PayCycle.
    /// </summary>
    public class PayCycleConfiguration : IEntityTypeConfiguration<PayCycle>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<PayCycle> builder)
        {
            builder.HasKey(x => new {x.PayCycleId, x.PayrollId});
            builder.Property(x => x.PayCycleId).ValueGeneratedNever();

            //Crea la relación uno a muchos
            builder.HasOne<Payroll>()
                .WithMany()
                .HasForeignKey(x => x.PayrollId)
                .IsRequired();
            
            
        }
    }
}
