using Moq;
using Moq.EntityFrameworkCore;
using Roster.Models;
using Rosters.Features.Rosters.Operations;


namespace Roster.Tests
{
    [TestFixture]
    public class CreateRosterTests
    {
        private Mock<RostersContext> _dbContext;

        [SetUp]
        public void Setup()
        {
            _dbContext = new Mock<RostersContext>();
        }

        [Test]
        public async Task CreateRosterValidator_HappyPath()
        {
            var locations = new List<Location>
            {
                new () {LocationId = 1}
            };

            var rosters = new List<Models.Roster>
            {
                new () {RosterId = 1, LocationId = 1 , StartingWeek = DateTime.Parse("06-05-2024")},
            };

            _dbContext.Setup(x => x.Rosters).ReturnsDbSet(rosters);
            _dbContext.Setup(x => x.Locations).ReturnsDbSet(locations);

            var request = new CreateRoster
            {
                LocationId = 1,
                StartingWeek = DateTime.Parse("13-05-2024")
            };

            var validator = new CreateRosterValidator(_dbContext.Object);

            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.True(result.IsValid);
        }

        [Test]
        public async Task CreateRosterValidator_NegativePath()
        {
            var locations = new List<Location>
            {
                new () {LocationId = 1}
            };

            var rosters = new List<Models.Roster>
            {
                new () {RosterId = 1, LocationId = 1 , StartingWeek = DateTime.Parse("06-05-2024")},
            };

            _dbContext.Setup(x => x.Rosters).ReturnsDbSet(rosters);
            _dbContext.Setup(x => x.Locations).ReturnsDbSet(locations);

            var request = new CreateRoster
            {
                LocationId = 1,
                StartingWeek = DateTime.Parse("06-05-2024")
            };

            var validator = new CreateRosterValidator(_dbContext.Object);

            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.False(result.IsValid);
        }
    }
}
