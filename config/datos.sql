use renters;

INSERT INTO Login VALUES("RT1", "andy@andy.com", "$2a$10$c2XcMJo4CeEaMF8xJjcS2OskQzGIqb6v5KERW50/dKlXY9vheHwQe");
INSERT INTO Login VALUES("OW1", "prueba@prueba.com", "$2a$10$QGVUVPlSWDG4XxTjqfbf0.q.c/d2RGrkYN1hCjVw8dBo1QCAGbIH.");

INSERT INTO Tipo VALUES(1, "Renter");
INSERT INTO Tipo VALUES(2, "Owner");
INSERT INTO Login_Tipo VALUES("RT1", 1);
INSERT INTO Login_Tipo VALUES("OW1", 2);
INSERT INTO Persona VALUES("RT1", "Andy", "P", "N", "Masculino", "1997-09-30", "5500", "CDMX", "RT1");
INSERT INTO Persona VALUES("OW1", "Prueba", "P", "P", "Femenino", "1996-12-31", "5500", "EdoMex", "OW1");

INSERT INTO Delegacion VALUES(1, "Cuajimalpa");
INSERT INTO Direccion VALUES(1, "SD", 10001, "C", 20, 24, 1);
INSERT INTO Persona_Dir VALUES("RT1", 1);
INSERT INTO Direccion VALUES(2, "CD", 10002, "D", 21, 25, 1);
INSERT INTO Persona_Dir VALUES("RT1", 2);

INSERT INTO Delegacion VALUES(2, "Ecatepec");
INSERT INTO Direccion VALUES(3, "FG", 10003, "F", 22, 26, 2);
INSERT INTO Persona_Dir VALUES("OW1", 3);
INSERT INTO Direccion VALUES(4, "HI", 10004, "G", 23, 27, 2);
INSERT INTO Persona_Dir VALUES("OW1", 4);