using Microsoft.AspNetCore.Mvc;
using ThaiBev.Api.Services;

namespace ThaiBev.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    private readonly IQueueService _queueService;

    public QueueController(IQueueService queueService)
    {
        _queueService = queueService;
    }

    [HttpPost("ticket")]
    public async Task<IActionResult> GetTicket()
    {
        var ticket = await _queueService.GetNextTicketAsync();
        return Ok(new { TicketNumber = ticket });
    }

    [HttpPost("clear")]
    public async Task<IActionResult> ClearQueue()
    {
        var ticket = await _queueService.ClearQueueAsync();
        return Ok(new { TicketNumber = ticket });
    }
}
