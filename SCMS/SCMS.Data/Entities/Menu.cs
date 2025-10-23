using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SCMS.Entities;

public partial class Menu
{
    [Key]
    [Column("MenuID")]
    public int MenuId { get; set; }

    public DateOnly MenuDate { get; set; }

    [Column("DishID")]
    public int DishId { get; set; }

    [ForeignKey("DishId")]
    [InverseProperty("Menus")]
    public virtual Dish Dish { get; set; } = null!;
}
