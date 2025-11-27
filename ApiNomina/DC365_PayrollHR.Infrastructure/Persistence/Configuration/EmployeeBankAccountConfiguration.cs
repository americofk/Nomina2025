/// <summary>
/// Configuración de Entity Framework para EmployeeBankAccount.
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
    /// Configuracion de entidad EmployeeBankAccount.
    /// </summary>
    public class EmployeeBankAccountConfiguration : IEntityTypeConfiguration<EmployeeBankAccount>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeBankAccount> builder)
        {
            builder.HasKey(x => new { x.EmployeeId, x.InternalId });
            builder.Property(x => x.InternalId).ValueGeneratedNever();

            builder.Property(x => x.BankName).HasMaxLength(100).IsRequired();
            builder.Property(x => x.AccountType);
            builder.Property(x => x.AccountNum).HasMaxLength(30).IsRequired();
            builder.Property(x => x.IsPrincipal);

            builder.Property(x => x.Comment).HasMaxLength(200);
            builder.Property(x => x.Currency).HasMaxLength(5);

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();
        }
    }
}
