/// <summary>
/// Configuración de Entity Framework para MenuApp.
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
    /// Configuracion de entidad MenuApp.
    /// </summary>
    public class MenuAppConfiguration : IEntityTypeConfiguration<MenuApp>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<MenuApp> builder)
        {
            builder.HasKey(x => x.MenuId);
            builder.Property(x => x.MenuId)
                .HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.MenuId),'MENU-000#')")
                .HasMaxLength(20);

            builder.Property(x => x.MenuName).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Icon).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Action).HasMaxLength(100);

            builder.HasOne<MenuApp>()
                .WithMany()
                .HasForeignKey(x => x.MenuFather);
        }
    }
}
