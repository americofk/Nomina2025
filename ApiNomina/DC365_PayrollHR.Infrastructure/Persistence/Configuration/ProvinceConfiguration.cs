using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class ProvinceConfiguration : IEntityTypeConfiguration<Province>
    {
        public void Configure(EntityTypeBuilder<Province> builder)
        {
            builder.HasKey(x => x.ProvinceId);
            builder.Property(x => x.ProvinceId).ValueGeneratedNever().IsRequired().HasMaxLength(10);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
        }
    }
}
