using System.Net.Sockets;
using Microsoft.AspNetCore.JsonPatch;
using Moq;
using Moq.EntityFrameworkCore;
using Roster.Features.Locations.Operations;
using Roster.Models;

namespace Roster.Tests
{
    [TestFixture]
    public class PartialUpdateLocationTest
    {
        private Mock<RostersContext> _dbContext;
        private PartialLocationModelValidator _modelValidator;

        [SetUp]
        public void Setup()
        {
            _dbContext = new Mock<RostersContext>();
            _modelValidator = new PartialLocationModelValidator();
        }

        [Test]
        public async Task PartialUpdateLocationValidator_HappyPath()
        {
            var locations = new List<Location>
            {
                new() { LocationId = 1, Address1 = "Old Address", City = "Sydney", State = "NSW", Country = "AU"}
            };
            _dbContext.Setup(x => x.Locations).ReturnsDbSet(locations);

            var patch = new JsonPatchDocument<PartialLocationModel>();
            patch.Replace(x => x.Address1, "New Address");

            var request = new PartialUpdateLocation()
            {
                LocationId = 1,
                Payload = patch
            };

            var validator = new PartialUpdateLocationValidator(_dbContext.Object, _modelValidator);

            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.True(result.IsValid);
        }

        [Test]
        public async Task PartialUpdateLocationValidator_NegativePath()
        {
            var locations = new List<Location>
            {
                new() { LocationId = 1, Address1 = "Old Address", City = "Sydney", State = "NSW", Country = "AU"}
            };
            _dbContext.Setup(x => x.Locations).ReturnsDbSet(locations);

            var patch = new JsonPatchDocument<PartialLocationModel>();
            patch.Replace(x => x.Address1, "");

            var request = new PartialUpdateLocation()
            {
                LocationId = 1,
                Payload = patch
            };

            var validator = new PartialUpdateLocationValidator(_dbContext.Object, _modelValidator);

            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.False(result.IsValid);
        }
    }
}