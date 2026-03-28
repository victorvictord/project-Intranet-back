Instrucciones para levantar el proyecto en modo desarrollo:

## Tener en cuenta ##
## Requerimientos ##
Tener instalado nodejs >= 22.17.1
Tener instalado npm >= 11.5.2

## Implementar ##
Ejecutar en el el bash el comando:
docker compose up --build

## ejecutar ##
Depurar:
Cambiar las rutas del bff a url externas o del contenedor que las ejecute

Ejecutar el comando: npm install para instalar las librerías y 
dependencias de npm.

Luego, ejecutar npm run dev  (para levantar el proyecto en modo desarrollo)
npm run build para compilarlo y crear los archivos productivos

npm run test es para levantar los test unitarios de la aplicación

npm run start para levantar el servidor en modo ambiente (sin compilaciones 
parciales en el pc ni hot-reloading).
