using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Roster.Infrastructure.Validations;

namespace Roster.Infrastructure.Middlewares;

public class ErrorHandlingMiddleware
{
    readonly RequestDelegate _next;
    readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException e)
        {
            await HandleValidationException(context, e);
        }
        catch (Exception e)
        {
            await HandleException(context, e);
        }
    }

    Task HandleException(HttpContext context, Exception e)
    {
        _logger.LogError(e, $"Unhandled exception thrown!");


        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/problem+json";
        var detail = new ProblemDetails
        {
            Title = "Unhandled exception!",
            Status = StatusCodes.Status500InternalServerError,
            Instance = context.Request.Path
        };

        return context.Response.WriteAsync(Json(detail));
    }

    Task HandleValidationException(HttpContext context, ValidationException e)
    {
        _logger.LogWarning($"Validation exception!");

        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        context.Response.ContentType = "application/problem+json";

        var response = new ValidationProblemDetails
        {
            Title = "validation exception",
            Status = 400,
            Detail = e.Message,
            Errors = GetErrors(e)
        };

        return context.Response.WriteAsync(Json(response));
    }

    string Json(object o)
    {
        return JsonConvert.SerializeObject(o, new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        });
    }

    IDictionary<string, string[]> GetErrors(ValidationException exception)
    {
        IReadOnlyDictionary<string, string[]> errors = null;
        if (exception is ValidationException validationException)
        {
            errors = validationException.ErrorsDictionary;
        }
        return errors.ToDictionary();
    }
}