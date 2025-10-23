using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SCMS.Entities;

[Index("Email", Name = "UQ__Users__A9D105348C5E4395", IsUnique = true)]
public partial class User
{
    [Key]
    [Column("UserID")]
    public int UserId { get; set; }

    [StringLength(100)]
    public string FullName { get; set; } = null!;

    [StringLength(100)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    public string PasswordHash { get; set; } = null!;

    [StringLength(50)]
    public string Role { get; set; } = null!;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? WalletBalance { get; set; }

    [Column("ParentID")]
    public int? ParentId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }

    [InverseProperty("Parent")]
    public virtual ICollection<User> InverseParent { get; set; } = new List<User>();

    [InverseProperty("User")]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    [ForeignKey("ParentId")]
    [InverseProperty("InverseParent")]
    public virtual User? Parent { get; set; }

    [InverseProperty("User")]
    public virtual ICollection<SystemLog> SystemLogs { get; set; } = new List<SystemLog>();
}
