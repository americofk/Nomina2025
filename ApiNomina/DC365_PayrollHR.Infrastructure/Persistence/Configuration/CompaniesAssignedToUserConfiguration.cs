/// <summary>
/// Configuración de Entity Framework para CompaniesAssignedToUser.
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
    /// Configuracion de entidad CompaniesAssignedToUser.
    /// </summary>
    public class CompaniesAssignedToUserConfiguration : IEntityTypeConfiguration<CompaniesAssignedToUser>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<CompaniesAssignedToUser> builder)
        {
            builder.HasKey(x => new { x.Alias, x.CompanyId });

            builder.HasOne<Company>().WithMany().HasForeignKey(x => x.CompanyId);

            builder.HasOne<User>().WithMany().HasForeignKey(x => x.Alias);
        }
    }
}
