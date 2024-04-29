using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Users.Shared;
using Roster.Models;

namespace Roster.Features.Users.Operations
{
    public class PartialUpdateUser : IRequest<GetUserResponse>
    {
        [FromRoute] public int UserId { get; set; }
        [FromBody] public JsonPatchDocument<PartialUserModel> Payload { get; set; }
    }

    public class PartialUserModel
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? Availability { get; set; }
    }
    

    public class PartialUpdateUserValidator : AbstractValidator<PartialUpdateUser>
    {
        readonly RostersContext _context;
        readonly PartialUserModelValidator _modelValidator;
        public PartialUpdateUserValidator(RostersContext context, PartialUserModelValidator modelValidator)
        {
            _context = context;
            _modelValidator = modelValidator;
            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("User Id must be greater than 0");
            RuleFor(x => x.Payload).Must(IsPayloadValid).WithMessage("Payload validation failed");
            _modelValidator = modelValidator;

        }

        private bool IsPayloadValid(PartialUpdateUser request, JsonPatchDocument<PartialUserModel> document, ValidationContext<PartialUpdateUser> validationContext)
        {
            var u = _context.Users.SingleOrDefault(x => x.UserId == request.UserId);
            if (u == null) return false;

            var model = new PartialUserModel
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role,
                Availability = u.Availability
            };

            try
            {
                document.ApplyTo(model);
                var validatedModel = _modelValidator.Validate(model);
                if (validatedModel.IsValid) return true;
                foreach (var x in validatedModel.Errors)
                {
                    validationContext.AddFailure(x);

                }
                return false;
            }
            catch (Exception e) 
            {
                return false;
            }
        }
    }

    public class PartialUserModelValidator : AbstractValidator<PartialUserModel>
    {
        public PartialUserModelValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.FirstName).NotEmpty().Matches("^[a-zA-Z'\\s]+$");
            RuleFor(x => x.LastName).NotEmpty().Matches("^[a-zA-Z'\\s]+$");
            RuleFor(x => x.Role).NotEmpty().Matches("^[a-zA-Z'\\s]+$");
            RuleFor(x => x.Availability).Matches("^[a-zA-Z'\\s]+$");
        }
    }

    public class PartialUpdateUserHandler : IRequestHandler<PartialUpdateUser, GetUserResponse>
    {
        readonly RostersContext _context;
        public PartialUpdateUserHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetUserResponse> Handle(PartialUpdateUser request, CancellationToken cancellationToken)
        {
            var u  = _context.Users.SingleOrDefault(x => x.UserId == request.UserId);
            if (u == null) return null;

            var model = new PartialUserModel
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role,
                Availability = u.Availability
            };

            request.Payload.ApplyTo(model);

            u.FirstName = model.FirstName;
            u.LastName = model.LastName;
            u.Role = model.Role;
            u.Availability = model.Availability;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                UserId = request.UserId,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role,
                Availability = u.Availability
            };
        }
    }
}
