using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ThaiBev.Api.Data;
using ThaiBev.Api.Services;
using Xunit;

namespace ThaiBev.Tests;

public class QueueServiceTests
{
    private IServiceScopeFactory CreateMockScopeFactory(AppDbContext dbContext)
    {
        var services = new ServiceCollection();
        services.AddSingleton(dbContext);
        var provider = services.BuildServiceProvider();
        return provider.GetRequiredService<IServiceScopeFactory>();
    }

    [Fact]
    public async Task GetNextTicketAsync_ShouldStartAtA0()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "Test_StartAtA0")
            .Options;

        using var context = new AppDbContext(options);
        var scopeFactory = CreateMockScopeFactory(context);
        var service = new QueueService(scopeFactory);

        // Act
        var result = await service.GetNextTicketAsync();

        // Assert
        Assert.Equal("A0", result.TicketNumber);
    }

    [Fact]
    public async Task GetNextTicketAsync_ShouldIncrementCorrectly()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "Test_Increment")
            .Options;

        using var context = new AppDbContext(options);
        var scopeFactory = CreateMockScopeFactory(context);
        var service = new QueueService(scopeFactory);

        // Act
        await service.GetNextTicketAsync(); // A0
        var result = await service.GetNextTicketAsync(); // A1

        // Assert
        Assert.Equal("A1", result.TicketNumber);
    }

    [Fact]
    public async Task GetNextTicketAsync_ShouldTransitionToB0_AfterA9()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "Test_Transition")
            .Options;

        using var context = new AppDbContext(options);
        context.QueueStates.Add(new QueueState { Id = 1, CurrentSequenceNumber = 9 });
        await context.SaveChangesAsync();

        var scopeFactory = CreateMockScopeFactory(context);
        var service = new QueueService(scopeFactory);

        // Act
        var result = await service.GetNextTicketAsync();

        // Assert
        Assert.Equal("B0", result.TicketNumber);
    }

    [Fact]
    public async Task GetNextTicketAsync_ShouldWrapAroundToA0_AfterZ9()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "Test_WrapAround")
            .Options;

        using var context = new AppDbContext(options);
        // Z is the 26th letter (index 25). Z9 = (25 * 10) + 9 = 259.
        context.QueueStates.Add(new QueueState { Id = 1, CurrentSequenceNumber = 259 });
        await context.SaveChangesAsync();

        var scopeFactory = CreateMockScopeFactory(context);
        var service = new QueueService(scopeFactory);

        // Act
        var result = await service.GetNextTicketAsync();

        // Assert
        Assert.Equal("A0", result.TicketNumber);
    }
}
