USe Library
CREATE TABLE Book(
 Id VARCHAR(255) PRIMARY KEY  
, Title VARCHAR(255),
PublicationYear INT NOT NULL,
AuthorId VARCHAR(255) FOREIGN KEY REFERENCES Authors(Id)  ON DELETE CASCADE NOT NULL,
GenreId VARCHAR(255) FOREIGN KEY REFERENCES Genre(Id) NOT NULL,
) 