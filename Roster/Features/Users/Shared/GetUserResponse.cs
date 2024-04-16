namespace Roster.Features.Users.Shared
{
    public class GetUserResponse
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? Availability { get; set; }
    }
}
