using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class BatchHistoryConfiguration : IEntityTypeConfiguration<BatchHistory>
    {
        public void Configure(EntityTypeBuilder<BatchHistory> builder)
        {
            builder.HasKey(x => x.InternalId);
            builder.Property(x => x.Information).HasColumnType(ColumnTypeConst.maxvarchartype);
        }
    }
}
