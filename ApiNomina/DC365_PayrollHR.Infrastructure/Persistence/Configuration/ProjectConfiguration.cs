using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasKey(x => x.ProjId);
            builder.Property(x => x.ProjId)
                .IsRequired()
                .HasMaxLength(20)
                .HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.ProjId),'PRJ-00000000#')");

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.LedgerAccount).HasMaxLength(20);
        }
    }
}
