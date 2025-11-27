/// <summary>
/// Configuración de Entity Framework para Province.
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
    /// Configuracion de entidad Province.
    /// </summary>
    public class ProvinceConfiguration : IEntityTypeConfiguration<Province>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Province> builder)
        {
            builder.HasKey(x => x.ProvinceId);
            builder.Property(x => x.ProvinceId).ValueGeneratedNever().IsRequired().HasMaxLength(10);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
        }
    }
}
