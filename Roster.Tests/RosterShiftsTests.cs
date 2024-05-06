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
        [TestCase("2024-04-29", "2024-04-28T08:00:00", "2024-04-30T16:00:00", ShiftValidationErrorCodes.DATE_NOT_IN_ROSTER)]
        [TestCase("2024-04-29", "2024-05-06T08:00:00", "2024-04-30T16:00:00", ShiftValidationErrorCodes.DATE_NOT_IN_ROSTER)]
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

        [Test]
        [TestCase("2024-04-29T12:00:00", "2024-04-29T17:00:00", ShiftValidationErrorCodes.USER_CANNOT_WORK_AGAIN_IN_SHIFT)]
        [TestCase("2024-05-02T12:00:00", "2024-05-02T17:00:00", ShiftValidationErrorCodes.USER_CANNOT_WORK_PAST_MAXIMUM_HOURS)]
        [TestCase("2024-05-02T12:00:00", "2024-05-02T17:00:00", ShiftValidationErrorCodes.ROSTER_IS_LOCKED)]
        // Starting week, 
        public async Task CreateShiftValidatorTest_UserShValidation_NegativePaths(string shiftStart, string shiftEnd, string errorCode)
        {

            //setup
            var roster = new Models.Roster //object of type Roster
            {
                RosterId = 1,
                IsLocked = true,
                Shifts = new List<Shift> //List of shift
                {
                    
                    new() //creates the existing shift
                    {
                        RosterId = 1, UserId = 1, ShiftId = 1, StartAt = DateTime.Parse("2024-04-29T09:00:00"),
                        EndAt = DateTime.Parse("2024-04-29T12:00:00"), TotalMinutes = 180
                    },
                    new() //creates the existing shift
                    {
                        RosterId = 1, UserId = 1, ShiftId = 2, StartAt = DateTime.Parse("2024-05-01T09:00:00"),
                        EndAt = DateTime.Parse("2024-05-01T14:00:00"), TotalMinutes = 300
                    }
                }
            };

            var rosters = new List<Models.Roster> { roster }; //added to list
            var users = new List<User>
            {
                new() { UserId = 1 } 
            };
            
            //mock setup with DB, queries and returns a set of collection
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
