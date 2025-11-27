/// <summary>
/// Configuración de Entity Framework para UserGridView.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuración de mapeo EF Core para UserGridView.
    /// </summary>
    public class UserGridViewConfiguration : IEntityTypeConfiguration<UserGridView>
    {
        /// <summary>
        /// Configura el mapeo de la entidad UserGridView.
        /// </summary>
        /// <param name="builder">Builder de la entidad.</param>
        public void Configure(EntityTypeBuilder<UserGridView> builder)
        {
            // Tabla
            builder.ToTable("UserGridViews");

            // Primary Key
            builder.HasKey(x => x.RecId);

            // Propiedades
            builder.Property(x => x.RecId)
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.UserRefRecId)
                   .IsRequired();

            builder.Property(x => x.EntityName)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(x => x.ViewType)
                   .IsRequired()
                   .HasMaxLength(20)
                   .HasDefaultValue("Grid");

            builder.Property(x => x.ViewScope)
                   .IsRequired()
                   .HasMaxLength(20)
                   .HasDefaultValue("Private");

            builder.Property(x => x.RoleRefRecId);

            builder.Property(x => x.ViewName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(x => x.ViewDescription)
                   .HasMaxLength(500);

            builder.Property(x => x.IsDefault)
                   .HasDefaultValue(false);

            builder.Property(x => x.IsLocked)
                   .HasDefaultValue(false);

            builder.Property(x => x.ViewConfig)
                   .IsRequired();

            builder.Property(x => x.SchemaVersion)
                   .HasDefaultValue(1);

            builder.Property(x => x.Checksum)
                   .HasMaxLength(64);

            builder.Property(x => x.UsageCount)
                   .HasDefaultValue(0);

            builder.Property(x => x.LastUsedOn);

            builder.Property(x => x.Tags)
                   .HasMaxLength(200);

            // Índices
            builder.HasIndex(x => new { x.UserRefRecId, x.EntityName, x.ViewName })
                   .IsUnique()
                   .HasDatabaseName("UX_UserGridViews_User_Entity_View");

            builder.HasIndex(x => new { x.UserRefRecId, x.ViewScope })
                   .HasDatabaseName("IX_UserGridViews_User_Scope");

            builder.HasIndex(x => new { x.EntityName, x.ViewType })
                   .HasDatabaseName("IX_UserGridViews_Entity_ViewType");
        }
    }
}
