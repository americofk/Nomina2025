/// <summary>
/// Configuración de Entity Framework para EmployeeAddress.
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
    /// Configuracion de entidad EmployeeAddress.
    /// </summary>
    public class EmployeeAddressConfiguration : IEntityTypeConfiguration<EmployeeAddress>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeAddress> builder)
        {
            builder.HasKey(x => new { x.EmployeeId, x.InternalId });
            builder.Property(x => x.InternalId).ValueGeneratedNever();

            builder.Property(x => x.Street).HasMaxLength(100).IsRequired();
            builder.Property(x => x.Home).HasMaxLength(10).IsRequired();
            builder.Property(x => x.Sector).HasMaxLength(50).IsRequired();
            builder.Property(x => x.City).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Province).HasMaxLength(50).IsRequired();
            builder.Property(x => x.ProvinceName).HasMaxLength(50).IsRequired();

            builder.Property(x => x.Comment).HasMaxLength(200);

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();
            
            builder.HasOne<Country>()
                .WithMany()
                .HasForeignKey(x => x.CountryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);




        }
    }
}
