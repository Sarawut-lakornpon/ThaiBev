namespace ThaiBev.Api.Data;

public class QueueState
{
    public int Id { get; set; }
    public int CurrentSequenceNumber { get; set; } // 0 = A0, 259 = Z9
    public DateTime LastUpdatedAt { get; set; }
}
