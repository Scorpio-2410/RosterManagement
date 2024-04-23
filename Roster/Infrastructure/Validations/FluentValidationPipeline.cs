using FluentValidation;
using MediatR;
using static System.Threading.Tasks.Task;

namespace Roster.Infrastructure.Validations;

public class FluentValidationPipeline<TRequest, TResponse> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    readonly IRequestHandler<TRequest, TResponse> _inner;
    readonly IEnumerable<IValidator<TRequest>> _validators;


    public FluentValidationPipeline(
        IRequestHandler<TRequest, TResponse> inner,
        IEnumerable<IValidator<TRequest>> validators)
    {
        _inner = inner;
        _validators = validators;

    }

    public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken)
    {
        if (!_validators.Any()) return await _inner.Handle(request, cancellationToken);


        var vTasks = _validators.Select(x => x.ValidateAsync(request, cancellationToken)).ToArray();
        WaitAll(vTasks);

        var errorsDictionary = vTasks.Select(x => x.Result)
            .SelectMany(x => x.Errors)
            .Where(x => x != null)
            .GroupBy(
                x => x.PropertyName,
                x => x.ErrorMessage,
                (propertyName, errorMessages) => new
                {
                    Key = propertyName,
                    Values = errorMessages.Distinct().ToArray()
                })
            .ToDictionary(x => x.Key, x => x.Values);

        if (errorsDictionary.Any())
        {
            throw new ValidationException($"Validation error for type: {typeof(TRequest).Name}",
                errorsDictionary);
        }


        return await _inner.Handle(request, cancellationToken);

    }
}