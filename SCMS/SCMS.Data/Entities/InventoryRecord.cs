using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SCMS.Entities;

public partial class InventoryRecord
{
    [Key]
    [Column("RecordID")]
    public int RecordId { get; set; }

    [Column("IngredientID")]
    public int IngredientId { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal ChangeAmount { get; set; }

    [StringLength(50)]
    public string ChangeType { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime? RecordDate { get; set; }

    [ForeignKey("IngredientId")]
    [InverseProperty("InventoryRecords")]
    public virtual Ingredient Ingredient { get; set; } = null!;
}
