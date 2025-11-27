/// <summary>
/// Configuración de Entity Framework para AuditLog.
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
    /// EF Core configuration for audit trail (ISO 27001 compliance)
    /// </summary>
    public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            // Primary key configuration using global SEQUENCE
            builder.HasKey(x => x.RecId);
            builder.Property(x => x.RecId)
                .HasDefaultValueSql("NEXT VALUE FOR dbo.RecId")
                .ValueGeneratedOnAdd();

            // Required fields
            builder.Property(x => x.EntityName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(x => x.FieldName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(x => x.OldValue)
                .IsRequired(false);

            builder.Property(x => x.NewValue)
                .IsRequired(false);

            builder.Property(x => x.ChangedBy)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.ChangedAt)
                .HasDefaultValueSql("GETDATE()")
                .IsRequired();

            builder.Property(x => x.EntityRefRecId)
                .IsRequired();

            builder.Property(x => x.DataAreaId)
                .HasMaxLength(10)
                .IsRequired();

            // Indexes for performance and compliance queries
            builder.HasIndex(x => new { x.EntityName, x.EntityRefRecId })
                .HasDatabaseName("IX_AuditLog_EntityName_EntityRefRecId");

            builder.HasIndex(x => x.ChangedAt)
                .HasDatabaseName("IX_AuditLog_ChangedAt");

            builder.HasIndex(x => x.DataAreaId)
                .HasDatabaseName("IX_AuditLog_DataAreaId");

            builder.HasIndex(x => x.ChangedBy)
                .HasDatabaseName("IX_AuditLog_ChangedBy");
        }
    }
}
