using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class FormatCodeConfiguration : IEntityTypeConfiguration<FormatCode>
    {
        public void Configure(EntityTypeBuilder<FormatCode> builder)
        {
            builder.HasKey(x => x.FormatCodeId);
            builder.Property(x => x.FormatCodeId).ValueGeneratedNever();

            builder.Property(x => x.FormatCodeId).IsRequired().HasMaxLength(5);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(15);

        }
    }
}
