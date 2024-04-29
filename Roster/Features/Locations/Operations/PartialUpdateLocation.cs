using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Roster.Features.Locations.Shared;
using Roster.Models;

namespace Roster.Features.Locations.Operations
{
    public class PartialUpdateLocation : IRequest<GetLocationResponse>
    {
        [FromRoute] public int LocationId { get; set; }
        [FromBody] public JsonPatchDocument<PartialLocationModel> Payload { get; set; }
    }

    public class PartialLocationModel
    {
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
    }

    public class PartialUpdateLocationValidator : AbstractValidator<PartialUpdateLocation>
    {
        readonly RostersContext _context;
        readonly PartialLocationModelValidator _modelValidator;
        public PartialUpdateLocationValidator(RostersContext context, PartialLocationModelValidator modelValidator)
        {
            _context = context;
            _modelValidator = modelValidator;

            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.LocationId)
                .GreaterThan(0).WithMessage("Location id must be a number greater than 0!")
                .Must(LocationMustExist).WithMessage("Location does not exit!");
            RuleFor(x => x.Payload)
                .Must(IsPayloadValid).WithMessage("Payload validation failed!");
        }

        bool IsPayloadValid(PartialUpdateLocation request, JsonPatchDocument<PartialLocationModel> document, ValidationContext<PartialUpdateLocation> validationContext)
        {
            var l = _context.Locations.SingleOrDefault(x => x.LocationId == request.LocationId);
            if(l == null) return false;

            var model = new PartialLocationModel
            {
                Address1 = l.Address1,
                Address2 = l.Address2,
                City = l.City,
                State = l.State,
                Country = l.Country

            };

            try
            {
                document.ApplyTo(model);
                var validatedModel = _modelValidator.Validate(model);
                if (validatedModel.IsValid) return true;
                foreach( var x in validatedModel.Errors)
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

        bool LocationMustExist(int locationId)
        {
            return _context.Locations.Any(x => x.LocationId == locationId);
        }
    }

    public class PartialLocationModelValidator : AbstractValidator<PartialLocationModel>
    {
        public PartialLocationModelValidator()
        {
            RuleFor(x => x.Address1).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.State).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();

        }
    }
    public class PartialUpdateLocationHandler : IRequestHandler<PartialUpdateLocation, GetLocationResponse>
    {
        readonly RostersContext _context;

        public PartialUpdateLocationHandler(RostersContext context)
        {
            _context = context;
        }

        public async Task<GetLocationResponse> Handle(PartialUpdateLocation request, CancellationToken cancellationToken)
        {
            var l = _context.Locations.SingleOrDefault(x => x.LocationId == request.LocationId);
            if (l == null) return null;


            var model = new PartialLocationModel
            {
                Address1 = l.Address1,
                Address2 = l.Address2,
                City = l.City,
                State = l.State,
                Country = l.Country
            };
            

            request.Payload.ApplyTo(model);


            l.Address1 = model.Address1;
            l.Address2 = model.Address2;
            l.City = model.City;
            l.State = model.State;
            l.Country = model.Country;

            await _context.SaveChangesAsync(cancellationToken);

            return new()
            {
                LocationId = l.LocationId,
                Address1 = l.Address1,
                Address2 = l.Address2,
                City = l.City,
                State = l.State,
                Country = l.Country
            };
        }
    }
}
