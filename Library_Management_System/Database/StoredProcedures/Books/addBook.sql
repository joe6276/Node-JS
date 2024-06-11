
USE Library
CREATE OR ALTER PROCEDURE addBook(@Id VARCHAR(255) ,@Title VARCHAR(255) ,@PublicationYear VARCHAR(255),
@AuthorId VARCHAR(255) , @GenreId VARCHAR(255)
)
AS
BEGIN

INSERT INTO Book(Id,Title,PublicationYear,AuthorId,GenreId)
VALUES(@Id,@Title,@PublicationYear,@AuthorId,@GenreId)
END