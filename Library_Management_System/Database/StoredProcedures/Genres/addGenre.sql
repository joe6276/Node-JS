
USE Library
CREATE OR ALTER PROCEDURE addGenre (@Id VARCHAR(255), @Name VARCHAR(255))
AS
BEGIN

INSERT INTO Genre(Id, Name) VALUES(@Id, @Name)
END
