namespace ThaiBev.Api.Services;

public record TicketResult(string TicketNumber, DateTime IssuedAt);

public interface IQueueService
{
    Task<TicketResult> GetNextTicketAsync();
    Task<TicketResult> GetCurrentQueueAsync();
    Task<string> ClearQueueAsync();
}
