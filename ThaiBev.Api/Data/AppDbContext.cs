using Microsoft.EntityFrameworkCore;

namespace ThaiBev.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<QueueState> QueueStates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Seed initial queue state
        modelBuilder.Entity<QueueState>().HasData(new QueueState 
        { 
            Id = 1, 
            CurrentSequenceNumber = -1, // So the first ticket will be 0 (A0)
            LastUpdatedAt = DateTime.UtcNow 
        });
    }
}
