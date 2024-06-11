USE Library

CREATE OR ALTER PROCEDURE updateBook(@Id VARCHAR(255) ,@Title VARCHAR(255) ,@PublicationYear VARCHAR(255),
@AuthorId VARCHAR(255) , @GenreId VARCHAR(255)
)
AS
BEGIN

UPDATE Book SET Title=@Title, PublicationYear=@PublicationYear,
AuthorId=@AuthorId , GenreId=GenreId
WHERE Id=@Id

END