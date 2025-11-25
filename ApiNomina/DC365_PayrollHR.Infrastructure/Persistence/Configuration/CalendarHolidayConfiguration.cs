using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class CalendarHolidayConfiguration : IEntityTypeConfiguration<CalendarHoliday>
    {
        public void Configure(EntityTypeBuilder<CalendarHoliday> builder)
        {
            builder.HasKey(x => x.CalendarDate);

            builder.Property(x => x.Description).IsRequired().HasMaxLength(100);
        }
    }
}
