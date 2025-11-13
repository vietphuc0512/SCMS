using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SCMS.Data.Entities;

public partial class SystemHealth
{
    [Key]
    [Column("HealthID")]
    public int HealthId { get; set; }

    [StringLength(100)]
    public string MetricName { get; set; } = null!;

    [StringLength(50)]
    public string MetricType { get; set; } = null!; // 'performance', 'financial', 'system', 'user'

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? NumericValue { get; set; }

    [StringLength(255)]
    public string? StringValue { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Timestamp { get; set; }

    [StringLength(50)]
    public string? Status { get; set; } // 'healthy', 'warning', 'critical'

    [StringLength(500)]
    public string? Notes { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }
}