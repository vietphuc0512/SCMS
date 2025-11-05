using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SCMS.Entities;

public partial class Dish
{
    [Key]
    [Column("DishID")]
    public int DishId { get; set; }

    [StringLength(100)]
    public string DishName { get; set; } = null!;

    [StringLength(255)]
    public string? Description { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    [StringLength(255)]
    public string? ImagePath { get; set; }

    public bool? IsAvailable { get; set; }

    [InverseProperty("Dish")]
    public virtual ICollection<Menu> Menus { get; set; } = new List<Menu>();

    [InverseProperty("Dish")]
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
