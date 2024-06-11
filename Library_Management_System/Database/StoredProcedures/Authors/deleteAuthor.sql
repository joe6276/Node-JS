USE Library


CREATE OR ALTER Procedure deleteAuthor (@Id VARCHAR(255))
AS
BEGIN

Delete FROM Authors WHERE Id=@id
END