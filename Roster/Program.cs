using Microsoft.EntityFrameworkCore;
using Rosters.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Registers Rostercontext with application dependency injection container
builder.Services.AddDbContext<RostersContext>(options =>
{
    //SQL database provider & search for connection string
    options.UseSqlServer("name=ConnectionStings:Database");
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
