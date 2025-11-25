using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Infrastructure.Persistence
{
    /// <summary>
    /// Audit interceptor for tracking data changes (ISO 27001 compliance)
    /// </summary>
    public class AuditInterceptor : SaveChangesInterceptor
    {
        private readonly ICurrentUserInformation _currentUserInformation;

        // Temporary storage for audit entries before RecId is generated
        private readonly List<AuditEntry> _pendingAudits = new List<AuditEntry>();

        // Audit fields to exclude from logging
        private static readonly string[] ExcludedProperties = new[]
        {
            "RecId", "CreatedBy", "CreatedOn", "ModifiedBy", "ModifiedOn",
            "IsDeleted", "DeletedBy", "DeletedOn", "DataAreaId"
        };

        public AuditInterceptor(ICurrentUserInformation currentUserInformation)
        {
            _currentUserInformation = currentUserInformation;
        }

        public override InterceptionResult<int> SavingChanges(
            DbContextEventData eventData,
            InterceptionResult<int> result)
        {
            if (eventData.Context != null)
            {
                PreparePendingAudits(eventData.Context);
            }

            return base.SavingChanges(eventData, result);
        }

        public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(
            DbContextEventData eventData,
            InterceptionResult<int> result,
            CancellationToken cancellationToken = default)
        {
            if (eventData.Context != null)
            {
                PreparePendingAudits(eventData.Context);
            }

            return await base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        public override int SavedChanges(SaveChangesCompletedEventData eventData, int result)
        {
            if (eventData.Context != null && _pendingAudits.Any())
            {
                ProcessPendingAudits(eventData.Context);
            }

            return base.SavedChanges(eventData, result);
        }

        public override async ValueTask<int> SavedChangesAsync(
            SaveChangesCompletedEventData eventData,
            int result,
            CancellationToken cancellationToken = default)
        {
            if (eventData.Context != null && _pendingAudits.Any())
            {
                await ProcessPendingAuditsAsync(eventData.Context, cancellationToken);
            }

            return await base.SavedChangesAsync(eventData, result, cancellationToken);
        }

        /// <summary>
        /// Prepare audit entries before SaveChanges
        /// </summary>
        private void PreparePendingAudits(DbContext context)
        {
            _pendingAudits.Clear();

            var changeTime = DateTime.Now;
            var currentUser = _currentUserInformation.Alias;
            var currentCompany = _currentUserInformation.Company;

            foreach (var entry in context.ChangeTracker.Entries())
            {
                // Skip if not auditable entity
                if (entry.Entity is not AuditableEntity && entry.Entity is not AuditableCompanyEntity)
                    continue;

                // Skip AuditLog entity to prevent recursion
                if (entry.Entity is AuditLog)
                    continue;

                // Only track Added, Modified states
                if (entry.State != EntityState.Added && entry.State != EntityState.Modified)
                    continue;

                var entityName = entry.Entity.GetType().Name;

                var auditEntry = new AuditEntry
                {
                    EntityEntry = entry,
                    EntityName = entityName,
                    ChangedBy = currentUser,
                    ChangedAt = changeTime,
                    DataAreaId = currentCompany
                };

                // Track field changes
                foreach (var property in entry.Properties)
                {
                    // Skip excluded audit fields
                    if (ExcludedProperties.Contains(property.Metadata.Name))
                        continue;

                    if (entry.State == EntityState.Modified)
                    {
                        // Skip if value hasn't changed
                        if (Equals(property.OriginalValue, property.CurrentValue))
                            continue;

                        auditEntry.Changes.Add(new PropertyChange
                        {
                            PropertyName = property.Metadata.Name,
                            OldValue = property.OriginalValue?.ToString(),
                            NewValue = property.CurrentValue?.ToString()
                        });
                    }
                    else if (entry.State == EntityState.Added)
                    {
                        // Skip null values on insert
                        if (property.CurrentValue == null)
                            continue;

                        auditEntry.Changes.Add(new PropertyChange
                        {
                            PropertyName = property.Metadata.Name,
                            OldValue = null,
                            NewValue = property.CurrentValue.ToString()
                        });
                    }
                }

                if (auditEntry.Changes.Any())
                {
                    _pendingAudits.Add(auditEntry);
                }
            }
        }

        /// <summary>
        /// Process pending audits after SaveChanges (when RecIds are available)
        /// </summary>
        private void ProcessPendingAudits(DbContext context)
        {
            var auditLogs = new List<AuditLog>();

            foreach (var auditEntry in _pendingAudits)
            {
                var entityRecId = GetRecIdFromEntity(auditEntry.EntityEntry);

                if (entityRecId == 0)
                    continue;

                foreach (var change in auditEntry.Changes)
                {
                    auditLogs.Add(new AuditLog
                    {
                        EntityName = auditEntry.EntityName,
                        FieldName = change.PropertyName,
                        OldValue = change.OldValue,
                        NewValue = change.NewValue,
                        ChangedBy = auditEntry.ChangedBy,
                        ChangedAt = auditEntry.ChangedAt,
                        EntityRefRecId = entityRecId,
                        CreatedBy = auditEntry.ChangedBy,
                        CreatedOn = auditEntry.ChangedAt,
                        DataAreaId = auditEntry.DataAreaId
                    });
                }
            }

            if (auditLogs.Any())
            {
                context.Set<AuditLog>().AddRange(auditLogs);
                context.SaveChanges();
            }

            _pendingAudits.Clear();
        }

        /// <summary>
        /// Process pending audits async after SaveChanges
        /// </summary>
        private async Task ProcessPendingAuditsAsync(DbContext context, CancellationToken cancellationToken)
        {
            var auditLogs = new List<AuditLog>();

            foreach (var auditEntry in _pendingAudits)
            {
                var entityRecId = GetRecIdFromEntity(auditEntry.EntityEntry);

                if (entityRecId == 0)
                    continue;

                foreach (var change in auditEntry.Changes)
                {
                    auditLogs.Add(new AuditLog
                    {
                        EntityName = auditEntry.EntityName,
                        FieldName = change.PropertyName,
                        OldValue = change.OldValue,
                        NewValue = change.NewValue,
                        ChangedBy = auditEntry.ChangedBy,
                        ChangedAt = auditEntry.ChangedAt,
                        EntityRefRecId = entityRecId,
                        CreatedBy = auditEntry.ChangedBy,
                        CreatedOn = auditEntry.ChangedAt,
                        DataAreaId = auditEntry.DataAreaId
                    });
                }
            }

            if (auditLogs.Any())
            {
                context.Set<AuditLog>().AddRange(auditLogs);
                await context.SaveChangesAsync(cancellationToken);
            }

            _pendingAudits.Clear();
        }

        /// <summary>
        /// Extract RecId from auditable entity
        /// </summary>
        private long GetRecIdFromEntity(EntityEntry entry)
        {
            if (entry.Entity is AuditableEntity auditableEntity)
            {
                return auditableEntity.RecId;
            }

            if (entry.Entity is AuditableCompanyEntity auditableCompanyEntity)
            {
                return auditableCompanyEntity.RecId;
            }

            return 0;
        }

        /// <summary>
        /// Temporary audit entry storage
        /// </summary>
        private class AuditEntry
        {
            public EntityEntry EntityEntry { get; set; }
            public string EntityName { get; set; }
            public string ChangedBy { get; set; }
            public DateTime ChangedAt { get; set; }
            public string DataAreaId { get; set; }
            public List<PropertyChange> Changes { get; set; } = new List<PropertyChange>();
        }

        /// <summary>
        /// Property change information
        /// </summary>
        private class PropertyChange
        {
            public string PropertyName { get; set; }
            public string OldValue { get; set; }
            public string NewValue { get; set; }
        }
    }
}
