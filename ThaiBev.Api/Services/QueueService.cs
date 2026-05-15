using Microsoft.EntityFrameworkCore;
using ThaiBev.Api.Data;

namespace ThaiBev.Api.Services;

public class QueueService : IQueueService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private static readonly SemaphoreSlim _lock = new SemaphoreSlim(1, 1);

    public QueueService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task<string> GetNextTicketAsync()
    {
        await _lock.WaitAsync();
        try
        {
            using var scope = _scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var state = await db.QueueStates.FirstOrDefaultAsync(q => q.Id == 1);
            if (state == null)
            {
                state = new QueueState { Id = 1, CurrentSequenceNumber = -1, LastUpdatedAt = DateTime.UtcNow };
                db.QueueStates.Add(state);
            }

            state.CurrentSequenceNumber++;
            
            // Limit is Z9 (259). After Z9, we wrap around to A0 (0).
            if (state.CurrentSequenceNumber > 259)
            {
                state.CurrentSequenceNumber = 0;
            }

            state.LastUpdatedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();

            return FormatQueueNumber(state.CurrentSequenceNumber);
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task<string> ClearQueueAsync()
    {
        await _lock.WaitAsync();
        try
        {
            using var scope = _scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var state = await db.QueueStates.FirstOrDefaultAsync(q => q.Id == 1);
            if (state != null)
            {
                state.CurrentSequenceNumber = -1;
                state.LastUpdatedAt = DateTime.UtcNow;
                await db.SaveChangesAsync();
            }

            return "00";
        }
        finally
        {
            _lock.Release();
        }
    }

    private string FormatQueueNumber(int sequence)
    {
        // sequence 0 = A0, 1 = A1, 9 = A9, 10 = B0, etc.
        char letter = (char)('A' + (sequence / 10));
        int digit = sequence % 10;
        return $"{letter}{digit}";
    }
}
