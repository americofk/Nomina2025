/// <summary>
/// Configuración de Entity Framework para UserImage.
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
    /// Configuracion de entidad UserImage.
    /// </summary>
    public class UserImageConfiguration : IEntityTypeConfiguration<UserImage>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<UserImage> builder)
        {
            builder.HasKey(x => x.Alias);
            builder.Property(x => x.Alias).ValueGeneratedNever();

            builder.Property(x => x.Extension).HasMaxLength(4).IsRequired();

            //builder.HasOne<User>().WithOne().HasForeignKey("Alias").IsRequired();
        }
    }
}
