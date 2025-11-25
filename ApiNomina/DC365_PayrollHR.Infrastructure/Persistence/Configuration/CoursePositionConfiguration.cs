using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class CoursePositionConfiguration : IEntityTypeConfiguration<CoursePosition>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<CoursePosition> builder)
        {
            builder.HasKey(x => new { x.CourseId, x.PositionId });

            builder.Property(x => x.Comment)
                .HasMaxLength(300)
                .IsRequired();

            builder.HasOne<Course>()
               .WithMany()
               .HasForeignKey(x => x.CourseId)
               .IsRequired();

            builder.HasOne<Position>()
               .WithMany()
               .HasForeignKey(x => x.PositionId)
               .IsRequired();
        }
    }
}
