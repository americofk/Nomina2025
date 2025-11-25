using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class EmployeeImageConfiguration : IEntityTypeConfiguration<EmployeeImage>
    {
        public void Configure(EntityTypeBuilder<EmployeeImage> builder)
        {
            builder.HasKey(x => x.EmployeeId);
            builder.Property(x => x.EmployeeId).ValueGeneratedNever();

            builder.Property(x => x.Extension).HasMaxLength(4).IsRequired();

        }
    }
}
