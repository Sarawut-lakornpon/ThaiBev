namespace ThaiBev.Api.Services;

public interface IQueueService
{
    Task<string> GetNextTicketAsync();
    Task<string> ClearQueueAsync();
}
