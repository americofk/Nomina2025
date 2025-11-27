/// <summary>
/// Configuración de Entity Framework para MenuAssignedToUser.
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
    /// Configuracion de entidad MenuAssignedToUser.
    /// </summary>
    public class MenuAssignedToUserConfiguration : IEntityTypeConfiguration<MenuAssignedToUser>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<MenuAssignedToUser> builder)
        {
            builder.HasKey(x => new { x.Alias, x.MenuId });

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(x => x.Alias)
                .IsRequired();

            builder.HasOne<MenuApp>()
                .WithMany()
                .HasForeignKey(x => x.MenuId)
                .IsRequired();
        }
    }
}
