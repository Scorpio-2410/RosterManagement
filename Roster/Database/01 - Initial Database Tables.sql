BEGIN TRAN

CREATE TABLE Location(
    location_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    address1 NVARCHAR(256) NULL,
    address2 NVARCHAR(256) NULL,
    city NVARCHAR(256) NULL,
    [state] NVARCHAR(256) NULL,
    country NVARCHAR(256) NULL,
)

CREATE TABLE Users (
    user_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    first_name NVARCHAR(256) NOT NULL,
    last_name NVARCHAR(256) NOT NULL,

    [role] NVARCHAR(16) NOT NULL, -- Admin, User, Manager

    [availability] NVARCHAR(32), -- Mon,Tue,Wed,Thu,Fri,Sat,Sun

)

CREATE TABLE Rosters (
    roster_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    location_id INT NOT NULL
                FOREIGN KEY REFERENCES Location(location_id),
    starting_week DATETIME NOT NULL,
)

CREATE TABLE Payslip(
    payslip_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL
            FOREIGN KEY REFERENCES Users(user_id),
    period_from DATETIME NOT NULL,
    period_to DATETIME NOT NULL,
    payment_date DATETIME NOT NULL,

    total_hours decimal (8,2),

    gross_income decimal (8,2),
    tax_amount decimal (8,2),
    net_income decimal (8,2)

)

CREATE TABLE Shifts(
    shift_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    roster_id INT NOT NULL
            FOREIGN KEY REFERENCES Rosters(roster_id),
    user_id INT NOT NULL
            FOREIGN KEY REFERENCES Users(user_id),
    payslip_id INT NULL
            FOREIGN KEY REFERENCES Payslip(payslip_id),
    start_at DATETIME2 NOT NULL,
    end_at DATETIME2 NOT NULL,

    cost_rate_hourly decimal (8,2),
    total_hours decimal (8,2),
    total_cost decimal (8,2),

)

COMMIT