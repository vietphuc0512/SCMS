using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SCMS.Data.Entities;

public partial class Transaction
{
    [Key]
    [Column("TransactionID")]
    public int TransactionId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Amount { get; set; }

    [StringLength(50)]
    public string Type { get; set; } = null!; // 'topup', 'payment', 'refund', 'transfer'

    [StringLength(50)]
    public string Status { get; set; } = null!; // 'pending', 'completed', 'failed', 'cancelled'

    [StringLength(255)]
    public string? Reference { get; set; } // Zalo Pay transaction ID or reference

    [StringLength(500)]
    public string? Description { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? BalanceBefore { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? BalanceAfter { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ProcessedAt { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Transactions")]
    public virtual User User { get; set; } = null!;

    [InverseProperty("Transaction")]
    public virtual ICollection<ParentApproval> ParentApprovals { get; set; } = new List<ParentApproval>();
}