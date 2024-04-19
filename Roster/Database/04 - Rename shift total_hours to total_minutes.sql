EXEC sp_RENAME 'Shifts.total_hours' , 'total_minutes', 'COLUMN'

ALTER TABLE Shifts 
ALTER COLUMN total_minutes int;

EXEC sp_RENAME 'Payslip.total_hours' , 'total_minutes', 'COLUMN'

ALTER TABLE Payslip
ALTER COLUMN total_minutes int;