using Microsoft.AspNetCore.JsonPatch;
using Moq;
using Moq.EntityFrameworkCore;
using Roster.Features.Locations.Operations;
using Roster.Features.Users.Operations;
using Roster.Models;

namespace Roster.Tests
{
    [TestFixture]
    public class PartialUpdateUserTests
    {
        private Mock<RostersContext> _dbContext;
        private PartialUserModelValidator _modelValidator;

        [SetUp]
        public void Setup()
        {
            _dbContext = new Mock<RostersContext>();
            _modelValidator = new PartialUserModelValidator();
        }

        [Test]
        public async Task PartialUpdateUserValidator_HappyPath()
        {
            var users = new List<User>()
            {
                new() { UserId = 1, FirstName = "Bob", LastName = "Stone", Role = "Federal Agent" }
            };

            _dbContext.Setup(x => x.Users).ReturnsDbSet(users);

            var patch = new JsonPatchDocument<PartialUserModel>();
            patch.Replace(x => x.FirstName, "Jet");

            var request = new PartialUpdateUser
            {
                UserId = 1,
                Payload = patch
            };

            var validator = new PartialUpdateUserValidator(_dbContext.Object, _modelValidator);

            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.True(result.IsValid);
        }

        [Test]
        public async Task PartialUpdateUserValidator_NegativePath()
        {
            var users = new List<User>()
            {
                new() { UserId = 1, FirstName = "Bob", LastName = "Stone", Role = "Federal Agent" }
            };

            _dbContext.Setup(x => x.Users).ReturnsDbSet(users);

            var patch = new JsonPatchDocument<PartialUserModel>();
            patch.Replace(x => x.FirstName, "1234$%#");

            var request = new PartialUpdateUser
            {
                UserId = 1,
                Payload = patch
            };

            var validator = new PartialUpdateUserValidator(_dbContext.Object, _modelValidator);

            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.False(result.IsValid);
        }
    }
}
