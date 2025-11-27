/// <summary>
/// Configuración de Entity Framework para Loan.
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
    /// Configuracion de entidad Loan.
    /// </summary>
    public class LoanConfiguration : IEntityTypeConfiguration<Loan>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Loan> builder)
        {
            builder.HasKey(x => x.LoanId);
            builder.Property(x => x.LoanId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.LoanId),'LO-00000000#')")
                    .HasMaxLength(20);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();
            builder.Property(x => x.LedgerAccount).HasMaxLength(30);
            builder.Property(x => x.Description).HasMaxLength(200);

            builder.Property(x => x.DepartmentId).HasMaxLength(20);
            builder.Property(x => x.ProjId).HasMaxLength(20);
            builder.Property(x => x.ProjCategoryId).HasMaxLength(20);         

        }
    }
}
