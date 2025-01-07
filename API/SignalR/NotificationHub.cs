using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;

namespace API.SignalR
{
    [Authorize]
    //public class NotificationHub : Hub
    //{
    //    private static readonly ConcurrentDictionary<string, string> UserConnections = new();

    //    public override Task OnConnectedAsync()
    //    {
    //        var email = Context.User?.GetEmail();

    //        if (!string.IsNullOrEmpty(email)) UserConnections[email] = Context.ConnectionId;
    //        return base.OnConnectedAsync();
    //    }

    //    public override Task OnDisconnectedAsync(Exception? exception)
    //    {
    //        var email = Context.User?.GetEmail();

    //        if (!string.IsNullOrEmpty(email)) UserConnections.TryRemove(email, out _);
    //        return base.OnDisconnectedAsync(exception);
    //    }

    //    public static string? GetConnectionIdByEmail(string email)
    //    {
    //        UserConnections.TryGetValue(email, out var connectionId);

    //        return connectionId;
    //    }
    //}

    public class NotificationHub(IConnectionMultiplexer redis) : Hub
    {
        // Store user connection in Redis when they connect 
        public async override Task OnConnectedAsync()
        {
            var email = Context.User?.Identity?.Name; // Email is stored as Username (can use the GetEmail method)
            if (!string.IsNullOrEmpty(email))
            {
                var db = redis.GetDatabase();
                await db.StringSetAsync($"connection:{email}", Context.ConnectionId);
            }

            await base.OnConnectedAsync();  
        }

        public async override Task OnDisconnectedAsync(Exception? exception)
        {
            var email = Context.User?.Identity?.Name; // Get user email
            if (!string.IsNullOrEmpty(email))
            {
                var db = redis.GetDatabase();
                await db.KeyDeleteAsync($"connection:{email}");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
