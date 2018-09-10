# SRW
## Acerca de
Este es un proyecto para la materia *Distributed Database*.
## Instrucciones de instalación
1. Clonar el repositorio o descargar.
2. Ejecutar ```npm install``` o ```yarn install``` y esperar a que se descarguen todas las dependencias.
3. Crear un archivo llamado ```keys.json``` en la raíz del proyecto con la siguiente estructura:
```JSON
{
    "HOST": "Dirección_del_host",
    "USUARIO": "Usuario_que_puede_acceder_a_la_base",
    "BD": "Nombre_de_la_base",
    "CONTRASEÑA": "Contraseña_del_usuario"
}
```
4. Ejecutar el script SQL llamado ```baseNS.sql``` y después el script ```datos.sql``` incluidos en la carpeta ```config```.
5. Ejecutar ```npm start``` o ```yarn start```.
6. Entra a [http://localhost:3000](http://localhost:3000) y  listo.
## Modo desarrollador
Para reiniciar el servidor automáticamente al modificar los archivos relacionados con este, en vez de ```npm start``` o ```yarn start```, ejecutar ```npm run dev``` o ```yarn dev```.