/// <summary>
/// Configuración de Entity Framework para EmployeeTax.
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
    /// Configuracion de entidad EmployeeTax.
    /// </summary>
    public class EmployeeTaxConfiguration : IEntityTypeConfiguration<EmployeeTax>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeTax> builder)
        {
            builder.HasKey(x => new { x.TaxId, x.EmployeeId, x.PayrollId});

            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();

            builder.HasOne<Payroll>()
                .WithMany()
                .HasForeignKey(x => x.PayrollId)
                .IsRequired();

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();

            builder.HasOne<Tax>()
                .WithMany()
                .HasForeignKey(x => new { x.TaxId, x.DataAreaId })
                .IsRequired();
        }
    }
}
