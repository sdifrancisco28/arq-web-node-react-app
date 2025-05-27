# arq-web-node-react-app
Repositorio que contiene la aplicación con frontend React y backend Node.js para la materia Arquitectura Web

Para levantar la app utiliza las imagenes:

 💿 arq-web-backend-img [/backend/Dockerfile]
 💿 arq-web-frontend-img [/frontend/Dockerfile]
 💿 arq-web-mongodb-img [/backend/mongo/Dockerfile]
 
 Estas se deberán generar previamente en cada directorio utilizando el dockerfile respectivamente.


## Para desarrollar es necesario el port forwarding hasta que quede publicado

ssh -L 3000:localhost:3000 santiagod@rpi-rvssian
