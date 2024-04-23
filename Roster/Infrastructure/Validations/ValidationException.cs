namespace Roster.Infrastructure.Validations;

public class ValidationException : Exception
{
    public IReadOnlyDictionary<string, string[]> ErrorsDictionary { get; set; }
    public ValidationException(string message, Dictionary<string, string[]> errors) : base(message)
    {
        ErrorsDictionary = errors;
    }
}