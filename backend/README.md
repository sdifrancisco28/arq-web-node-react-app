El Dockerfile de este directorio buildea la imagen para el backend: arq-web-backend-img

## Buildear con el comando
docker build -t arq-web-backend-img:[tag] .

# Reemplazar tag por la versión de la imagen


##### ARCHIVO ENV
Es necesario crear un archivo .env con las siguientes variables: (Todo lo que esté como [VARIABLE] se refiere a una variable que debe ser reemplaza por el valor)

# Configuración de mongodb
MONGODB_URI=mongodb://[MONGODB_USER]:[MONGODB_PASS]@mongo:27017/NodeAppDB
MONGODB_USER=[MONGODB_USER]
MONGODB_PASS=[MONGODB_PASS]

# JWT que se utiliza como salting para hashear la pass [Por ahora queda por defecto ese valor]
JWTPRIVATEKEY=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjkyNjEyMSwiaWF0IjoxNzE2OTI2MTIxfQ.EbeEJCUZzUwpMsZ0V3-t-3nO29f0wtw7dMCWDus3S8Q
JWTPRIVATEKEY_FORGOT=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjkyNjEyMSwiaWF0IjoxNzE2OTI2MTIxfQ.EbeEJCUZzUwpMsZ0V3-t-3nO29f0wtw7dMCWDus3S8Q
SALT = 10

# Configuración de gmail para el envío de correos de recuperación
EMAIL=[CORREO]
PASSWORD=[PASSWORD_APP]


