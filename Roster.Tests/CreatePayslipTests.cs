using Moq;
using Moq.EntityFrameworkCore;
using Roster.Features.Rosters.Operations;
using Roster.Models;


namespace Roster.Tests
{
    [TestFixture]
    public class CreatePayslipTests
    {
        private Mock<RostersContext> _dbContext;

        [SetUp]
        public void Setup()
        {
            _dbContext = new Mock<RostersContext>();
        }

        [Test]
        public async Task CreatePayslipValidator_HappyPath()
        {
            var rosters = new List<Models.Roster>()
            {
                new() { RosterId = 1, IsLocked = false}
            };

            _dbContext.Setup(x => x.Rosters).ReturnsDbSet(rosters);

            var request = new CreatePayslips()
            {
                RosterId = 1
            };

            var validator = new CreatePayslipsValidator(_dbContext.Object);

            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.True(result.IsValid);
        }
    }
}
