/// <summary>
/// Configuración de Entity Framework para EmployeeDeductionCode.
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
    /// Configuracion de entidad EmployeeDeductionCode.
    /// </summary>
    public class EmployeeDeductionCodeConfiguration : IEntityTypeConfiguration<EmployeeDeductionCode>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeDeductionCode> builder)
        {
            builder.HasKey(x => new { x.DeductionCodeId, x.EmployeeId, x.PayrollId });

            builder.Property(x => x.FromDate).IsRequired();
            builder.Property(x => x.ToDate).IsRequired();
            //builder.Property(x => x.IndexDeduction).IsRequired();
            //builder.Property(x => x.PercentContribution).IsRequired();
            //builder.Property(x => x.PercentDeduction).IsRequired();

            builder.Property(x => x.Comment)
                .HasMaxLength(200);

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();

            builder.HasOne<Payroll>()
                .WithMany()
                .HasForeignKey(x => x.PayrollId)
                .IsRequired();

            builder.HasOne<DeductionCode>()
                .WithMany()
                .HasForeignKey(x => x.DeductionCodeId)
                .IsRequired();
        }
    }
}
