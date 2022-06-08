/**CREATE DATABASE my_closet;

CREATE TABLE my_closet.usuario ( 
    idUsuario SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT , 
    nombre VARCHAR(255) NOT NULL , 
    clave VARCHAR(255) NOT NULL , 
    correo VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`idUsuario`), 
    UNIQUE `correo_usuario` (`correo`));

CREATE TABLE my_closet.outfit ( 
    idOutfit INT NOT NULL AUTO_INCREMENT , 
    idUsuario SMALLINT UNSIGNED NOT NULL , 
    nombreOutfit VARCHAR(255) NOT NULL , 
    fechaCreacion DATE NOT NULL , 
    PRIMARY KEY (`idOutfit`));

CREATE TABLE my_closet.categoria ( 
    idCategoria TINYINT UNSIGNED NOT NULL AUTO_INCREMENT , 
    nombreCategoria VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`idCategoria`), 
    UNIQUE `nombreCategoria` (`nombreCategoria`));

CREATE TABLE my_closet.subcategoria ( 
    idSubcategoria INT NOT NULL AUTO_INCREMENT , 
    nombreSubcategoria VARCHAR(255) NOT NULL , 
    idCategoria TINYINT UNSIGNED NOT NULL , 
    PRIMARY KEY (`idSubcategoria`));

CREATE TABLE my_closet.prenda ( 
    idPrenda INT NOT NULL AUTO_INCREMENT , 
    idUsuario SMALLINT UNSIGNED NOT NULL , 
    descripcion VARCHAR (255) NULL , 
    talla CHAR(3) NOT NULL , 
    idSubcategoria INT NOT NULL ,
    nombrePrenda VARCHAR (25) NOT NULL,
    PRIMARY KEY (`idPrenda`));

CREATE TABLE my_closet.relusuariosubcategoria ( 
    idSubcategoria INT NOT NULL , 
    idUsuario SMALLINT UNSIGNED NOT NULL );


CREATE TABLE `my_closet`.`relprendaoutfit` ( 
    idOutfit INT NOT NULL , 
    idPrenda INT NOT NULL );





ALTER TABLE outfit ADD CONSTRAINT `fk_idUsuario` FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario);

ALTER TABLE subcategoria ADD CONSTRAINT `fk_idCategoria` FOREIGN KEY (idCategoria) REFERENCES categoria (idCategoria);

ALTER TABLE prenda ADD CONSTRAINT `fk_idUsuarioDePrenda` FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario);

ALTER TABLE prenda ADD CONSTRAINT `fk_idSubcategorias` FOREIGN KEY (idSubcategoria) REFERENCES subcategoria (idSubcategoria);

ALTER TABLE relusuariosubcategoria ADD CONSTRAINT `fk_idRelUsuarioDePrenda` FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario);

ALTER TABLE relusuariosubcategoria ADD CONSTRAINT `fk_Relsubcategoria` FOREIGN KEY (idSubcategoria) REFERENCES subcategoria (idSubcategoria);

**/


CREATE DATABASE my_closet;

CREATE TABLE my_closet.usuario ( 
    idUsuario SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT , 
    nombre VARCHAR(255) NOT NULL , 
    clave VARCHAR(255) NOT NULL , 
    correo VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`idUsuario`), 
    UNIQUE `correo_usuario` (`correo`));

CREATE TABLE my_closet.outfit ( 
    idOutfit INT NOT NULL AUTO_INCREMENT , 
    idUsuario SMALLINT UNSIGNED NOT NULL , 
    nombreOutfit VARCHAR(255) NOT NULL , 
    fechaCreacion DATE NOT NULL , 
    PRIMARY KEY (`idOutfit`));

CREATE TABLE my_closet.categoria ( 
    idCategoria TINYINT UNSIGNED NOT NULL AUTO_INCREMENT , 
    nombreCategoria VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`idCategoria`), 
    UNIQUE `nombreCategoria` (`nombreCategoria`));

CREATE TABLE my_closet.subcategoria ( 
    idSubcategoria INT NOT NULL AUTO_INCREMENT , 
    nombreSubcategoria VARCHAR(255) NOT NULL , 
    idCategoria TINYINT UNSIGNED NOT NULL , 
    PRIMARY KEY (`idSubcategoria`));

CREATE TABLE my_closet.prenda ( 
    idPrenda INT NOT NULL AUTO_INCREMENT , 
    idUsuario SMALLINT UNSIGNED NOT NULL , 
    descripcion VARCHAR (255) NULL , 
    talla CHAR(3) NOT NULL , 
    idSubcategoria INT NOT NULL ,
    nombrePrenda VARCHAR (255) NOT NULL,
    PRIMARY KEY (`idPrenda`));

CREATE TABLE my_closet.relusuariosubcategoria ( 
    idSubcategoria INT NOT NULL , 
    idUsuario SMALLINT UNSIGNED NOT NULL );


CREATE TABLE my_closet.relprendaoutfit ( 
    idOutfit INT NOT NULL , 
    idPrenda INT NOT NULL );







ALTER TABLE outfit ADD CONSTRAINT `fk_idUsuario` FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario);

ALTER TABLE subcategoria ADD CONSTRAINT `fk_idCategoria` FOREIGN KEY (idCategoria) REFERENCES categoria (idCategoria);

ALTER TABLE prenda ADD CONSTRAINT `fk_idUsuarioDePrenda` FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario);

ALTER TABLE prenda ADD CONSTRAINT `fk_idSubcategorias` FOREIGN KEY (idSubcategoria) REFERENCES subcategoria (idSubcategoria);

ALTER TABLE relusuariosubcategoria ADD CONSTRAINT `fk_idRelUsuarioDePrenda` FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario);

ALTER TABLE relusuariosubcategoria ADD CONSTRAINT `fk_Relsubcategoria` FOREIGN KEY (idSubcategoria) REFERENCES subcategoria (idSubcategoria);



