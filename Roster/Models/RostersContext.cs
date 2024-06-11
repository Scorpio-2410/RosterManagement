using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Roster.Models;

public partial class RostersContext : DbContext
{
    public RostersContext()
    {
    }

    public RostersContext(DbContextOptions<RostersContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Payslip> Payslips { get; set; }

    public virtual DbSet<Roster> Rosters { get; set; }

    public virtual DbSet<Shift> Shifts { get; set; }

    public virtual DbSet<User> Users { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=.;Database=Rosters;User Id=sa;Password=s@rmaad2!;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationId).HasName("PK__Location__771831EAAF730581");

            entity.Property(e => e.LocationId).HasColumnName("location_id");
            entity.Property(e => e.Address1)
                .HasMaxLength(256)
                .HasColumnName("address1");
            entity.Property(e => e.Address2)
                .HasMaxLength(256)
                .HasColumnName("address2");
            entity.Property(e => e.City)
                .HasMaxLength(256)
                .HasColumnName("city");
            entity.Property(e => e.Country)
                .HasMaxLength(256)
                .HasColumnName("country");
            entity.Property(e => e.State)
                .HasMaxLength(256)
                .HasColumnName("state");
        });

        modelBuilder.Entity<Payslip>(entity =>
        {
            entity.HasKey(e => e.PayslipId).HasName("PK__Payslip__09FF4DA4A8FADC43");

            entity.ToTable("Payslip");

            entity.Property(e => e.PayslipId).HasColumnName("payslip_id");
            entity.Property(e => e.GrossIncome)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("gross_income");
            entity.Property(e => e.NetIncome)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("net_income");
            entity.Property(e => e.PaymentDate).HasColumnName("payment_date");
            entity.Property(e => e.PeriodFrom).HasColumnName("period_from");
            entity.Property(e => e.PeriodTo).HasColumnName("period_to");
            entity.Property(e => e.TaxAmount)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("tax_amount");
            entity.Property(e => e.TotalMinutes).HasColumnName("total_minutes");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Payslips)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Payslip__user_id__3F466844");
        });

        modelBuilder.Entity<Roster>(entity =>
        {
            entity.HasKey(e => e.RosterId).HasName("PK__Rosters__B1683609A23FAD64");

            entity.Property(e => e.RosterId).HasColumnName("roster_id");
            entity.Property(e => e.IsLocked).HasColumnName("is_locked");
            entity.Property(e => e.LocationId).HasColumnName("location_id");
            entity.Property(e => e.LockedAt).HasColumnName("locked_at");
            entity.Property(e => e.StartingWeek).HasColumnName("starting_week");

            entity.HasOne(d => d.Location).WithMany(p => p.Rosters)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rosters__locatio__3C69FB99");
        });

        modelBuilder.Entity<Shift>(entity =>
        {
            entity.HasKey(e => e.ShiftId).HasName("PK__Shifts__7B267220A89D15C0");

            entity.Property(e => e.ShiftId).HasColumnName("shift_id");
            entity.Property(e => e.CostRateHourly)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("cost_rate_hourly");
            entity.Property(e => e.EndAt).HasColumnName("end_at");
            entity.Property(e => e.IsSpecial).HasColumnName("is_special");
            entity.Property(e => e.PayslipId).HasColumnName("payslip_id");
            entity.Property(e => e.RosterId).HasColumnName("roster_id");
            entity.Property(e => e.StartAt).HasColumnName("start_at");
            entity.Property(e => e.TotalCost)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("total_cost");
            entity.Property(e => e.TotalMinutes).HasColumnName("total_minutes");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Payslip).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.PayslipId)
                .HasConstraintName("FK__Shifts__payslip___440B1D61");

            entity.HasOne(d => d.Roster).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.RosterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Shifts__roster_i__4222D4EF");

            entity.HasOne(d => d.User).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Shifts__user_id__4316F928");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__B9BE370FACD4686E");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Availability)
                .HasMaxLength(64)
                .HasColumnName("availability");
            entity.Property(e => e.FirstName)
                .HasMaxLength(256)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(256)
                .HasColumnName("last_name");
            entity.Property(e => e.Role)
                .HasMaxLength(16)
                .HasColumnName("role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
