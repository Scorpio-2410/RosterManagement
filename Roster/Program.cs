using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roster.Services;
using Roster.Models;
using FluentValidation;
using MediatR;
using Roster.Infrastructure.Middlewares;
using Roster.Infrastructure.Validations;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureAppConfiguration(options =>
    {
        options.AddUserSecrets<Program>(true);
    })
;
// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.Configure<ApiBehaviorOptions>(options => { options.SuppressInferBindingSourcesForParameters = true; });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Registers Rostercontext with application dependency injection container
builder.Services.AddDbContext<RostersContext>((options) =>
{

    //SQL database provider & search for connection string
    options.UseSqlServer("name=Database");
});

//Registers MediatR services in the application's dependency injection container.
builder.Services.AddMediatR(o => o.RegisterServicesFromAssemblyContaining<Program>());

// fluent validation
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.Decorate(typeof(IRequestHandler<,>), typeof(FluentValidationPipeline<,>));


// application services
builder.Services.AddTransient<RosterService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.UseMiddleware<ErrorHandlingMiddleware>();
app.MapControllers();

app.Run();
