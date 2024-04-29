using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Roster.Features.Rosters.Operations;
using Roster.Models;

namespace Roster.Tests
{
    [TestFixture]
    public class RosterShiftsTests
    {
        private Mock<RostersContext> _dbContext;

        [SetUp]
        public void Setup()
        {
            _dbContext = new Mock<RostersContext>();

        }


        [Test]
        public async Task CreateShiftValidatorTest_HappyPath()
        {
            //setup 
            var rosters = new List<Models.Roster>
            {
                new() {RosterId = 1, StartingWeek = DateTime.UtcNow}
            };

            var users = new List<User>()
            {
                new() { UserId = 1 }
            };


            _dbContext.Setup(x => x.Rosters).ReturnsDbSet(rosters);
            _dbContext.Setup(x => x.Users).ReturnsDbSet(users);


            var request = new CreateShift
            {
                RosterId = 1,
                Payload = new()
                {
                    UserId = 1,
                    StartAt = DateTime.UtcNow.AddHours(-1),
                    EndAt = DateTime.UtcNow
                }
            };

            var validator = new CreateShiftValidator(_dbContext.Object);


            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.True(result.IsValid);
        }

        [Test]
        [TestCase("2024-04-29", "2024-04-29T08:00:00", "2024-04-30T16:00:00", ShiftValidationErrorCodes.DATES_DO_NOT_MATCH)]
        public async Task CreateShiftValidatorTest_DateValidation_NegativePaths(
            string rosterDate,
            string shiftStart, string shiftEnd,
            string errorCode)
        {
            //setup 
            var rosters = new List<Models.Roster>
            {
                new() {RosterId = 1, StartingWeek = DateTime.Parse(rosterDate)}
            };

            var users = new List<User>()
            {
                new() { UserId = 1 }
            };


            _dbContext.Setup(x => x.Rosters).ReturnsDbSet(rosters);
            _dbContext.Setup(x => x.Users).ReturnsDbSet(users);


            var request = new CreateShift
            {
                RosterId = 1,
                Payload = new()
                {
                    UserId = 1,
                    StartAt = DateTime.Parse(shiftStart),
                    EndAt = DateTime.Parse(shiftEnd)
                }
            };

            var validator = new CreateShiftValidator(_dbContext.Object);


            // system under test
            var result = await validator.ValidateAsync(request);

            // assertions
            Assert.False(result.IsValid);
            var error = result.Errors.FirstOrDefault(x => x.ErrorCode == errorCode);

            Assert.NotNull(error);
        }
    }
}
