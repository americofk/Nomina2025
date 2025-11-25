using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class EarningCodeVersionConfiguration : IEntityTypeConfiguration<EarningCodeVersion>
    {
        public void Configure(EntityTypeBuilder<EarningCodeVersion> builder)
        {
            builder.HasKey(x => x.InternalId);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.ProjId).HasMaxLength(20);
            builder.Property(x => x.Department).HasMaxLength(20);
            builder.Property(x => x.LedgerAccount).HasMaxLength(30);
            builder.Property(x => x.ValidFrom).IsRequired();
            builder.Property(x => x.ValidTo).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(200);

            builder.HasOne<EarningCode>()
                .WithMany()
                .HasForeignKey(x => x.EarningCodeId)
                .IsRequired();
        }
    }
}
