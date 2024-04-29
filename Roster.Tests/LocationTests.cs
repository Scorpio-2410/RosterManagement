using Microsoft.EntityFrameworkCore;
using Moq;
using Roster.Models;
using Rosters.Features.Locations.Operations;

namespace Roster.Tests
{
    [TestFixture]
    public class LocationTests
    {
        private Mock<RostersContext> _dbContext;

        [SetUp]
        public void Setup()
        {
            _dbContext = new Mock<RostersContext>();

        }


        [TestCase(1, 1, 2)]
        public void Test1(int x, int y, int r)
        {

            Assert.True(x + y == r);
        }

        [Test]
        public async Task CreateLocation()
        {
            // setup
            Location location = null;

            var locationMock = new Mock<DbSet<Location>>();
            locationMock
                .Setup(x => x.AddAsync(It.IsAny<Location>(), It.IsAny<CancellationToken>()))
                .Callback<Location, CancellationToken>((loc, cx) =>
                {
                    loc.LocationId = 1;
                    location = loc;
                });

            _dbContext.Setup(x => x.Locations).Returns(locationMock.Object);
            _dbContext.Setup(x => x.SaveChangesAsync(It.IsAny<CancellationToken>())).Verifiable();


            // system under test
            var handler = new CreateLocationHandler(_dbContext.Object);

            var request = new CreateLocation()
            {
                Address1 = "a",
                Address2 = "b",
                State = "c",
                City = "d",
                Country = "e"
            };

            var response = await handler.Handle(request, CancellationToken.None);

            // assert
            Assert.NotNull(location);

            Assert.AreEqual(request.Address1, location.Address1);
            Assert.AreEqual(request.Address2, location.Address2);
            Assert.AreEqual(request.State, location.State);
            Assert.AreEqual(request.City, location.City);
            Assert.AreEqual(request.Country, location.Country);

            _dbContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()));

            Assert.True(response.LocationId > 0);
        }
    }
}