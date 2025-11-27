/// <summary>
/// Configuración de Entity Framework para EmployeeLoan.
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
    /// Configuracion de entidad EmployeeLoan.
    /// </summary>
    public class EmployeeLoanConfiguration : IEntityTypeConfiguration<EmployeeLoan>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeLoan> builder)
        {
            builder.HasKey(x => new { x.InternalId, x.EmployeeId });

            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();
            builder.Property(x => x.LoanAmount).IsRequired();

            builder.HasOne<Payroll>()
                .WithMany()
                .HasForeignKey(x => x.PayrollId)
                .IsRequired();

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();

            builder.HasOne<Loan>()
                .WithMany()
                .HasForeignKey(x => x.LoanId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
