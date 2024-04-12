namespace Roster.Features.Shared;

public sealed class SearchResponse<TResult>
{
    public ICollection<TResult> Result { get; set; }

    public int TotalRecords { get; set; }
    public int PageSize { get; set; }
    public int PageNumber { get; set; }
}