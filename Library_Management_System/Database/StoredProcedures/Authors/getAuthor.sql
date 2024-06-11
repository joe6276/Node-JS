USE Library


CREATE OR ALTER Procedure getAuthor (@Id VARCHAR(255))
AS
BEGIN
SELECT * FROm Authors WHERE Id =@Id
END