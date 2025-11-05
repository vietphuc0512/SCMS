using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SCMS.Entities;

[Table("SystemLog")]
public partial class SystemLog
{
    [Key]
    [Column("LogID")]
    public int LogId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    [StringLength(255)]
    public string Action { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime? LogDate { get; set; }

    [Column("IPAddress")]
    [StringLength(50)]
    public string? Ipaddress { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("SystemLogs")]
    public virtual User User { get; set; } = null!;
}
