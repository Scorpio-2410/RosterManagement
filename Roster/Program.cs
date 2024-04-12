using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rosters.Models;

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
