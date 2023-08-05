# Notas:

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/cesarockstar1985/socket-chat/blob/main/README.md)
[![es](https://img.shields.io/badge/lang-es-green.svg)](https://github.com/cesarockstar1985/socket-chat/blob/main/README.es.md)

Este es un pequeño chat hecho con socket io, express y nodeJS.

Cuenta con un login de usuario para ingresar al chat.

Para reconstruir los módulos de node node se debe ejecutar el comando: 

```
npm install
```

# Base de datos
Abrir algun manejador de base de datos e importar el archivo adamspay_backend.sql que se encuentra en el directorio Db dump.

# Credenciales de usuarios:

- Primer Usuario:

    User: Cesar

    Pass: primerUsuario

- Segundo Usuario:

    User: Carlos

    Pass: segundoUsuario
    
    
# Ejecutar la app
Para ejecutar el chat ir a la raíz del proyecto y ejecutar:

```
npm start
```

El servidor que corre la aplicación se encuentra en el puerto 3000.

En un navegador ingresar a localhost:3000.

# Workflow

Elegir uno de los productos en el homepage y click en el botón comprar.
Debe redirigir a la url de pago de AdamsPay.
Hacer click en "Simular pago" y luego en "Simular pago exitoso".
En la pantalla de detalle de pago darle "Finalizar".
Redirige a la página de confirmación de pago en caso de que sea un pago confirmado.

# Credenciales AdamsPay

Se puede ingresar al portal de comercios de AdamsPay para confirmar
que la deuda se haya creado y la transacción se haya aprobado.

user: testadamspay@gmail.com
pass: testApi

# Credenciales Mailtrap

La app también cuenta con envío de notificaciones vía email.
Las notificaciones se envían al crearse la deuda del usuario
en el portal de comercio, al ocurrir un error en el pago
y al confirmarse el pago.

Se puede ingresar al dashboard de Mailtrap para verificar el envío
de emails.

user: testadamspay@gmail.com
pass: testMailtrap

