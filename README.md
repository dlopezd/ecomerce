# E-Commerce Amiibos

https://amiibos.web.app/

Es una aplicación desarrollada en React + Redux + React-Router que consume los servicios de la API [Amiibo](https://www.amiiboapi.com/) para obtener una lista de Amiibos de Nintendo. Las dos principales funciones desarrolladas son:
  - Mostrar lista de Amiibos disponibles para la venta (el precio de cada ítem es aleatorio).
  - Filtrar ítems en función de su precio y tipo.
  - Ordenar ítems de forma ascendente y descendente por Nombre y Precio.
  - Búsqueda por nombre, serie o juego. Se aplican reglas en ese orden.
  - Ver detalle de un ítem.
  - Agregar ítems al carro de compra.
  - Ver el checkout con todos los productos a comprar.

## Características!
  - La primera vez que se le solicita la información al api, se almacena en un ```estado de redux``` para evitar la sobrecarga del back con información ya solicitada.
  - La aplicación se diseño pensando en que se puede ver el detalle de un producto accediendo desde los resultados de la búsqueda o sólo con el link del producto.

## Limitaciones:
  - Al no estar conectado a un backend propio, no se puede gestionar el carrito de compras para ser visto en varias pestañas/ventanas del navegador.
  - Hay detalles visuales que se omitieron de corregir, previligiando funcionalidad por sobre diseño dado el limitado tiempo disponible para el desarrollo

## Instalación

Para instalar las dependencias (incluídas las de desarrollo):

```sh
$ cd ecomerce
$ npm install -d
```

Para ejecutar la aplicación:
```sh
$ npm start
```

La aplicación levantará un servidor de desarrollo que utiliza por defecto el puerto ```3000```.
Para acceder a la aplicación debes ingresar desde el navegador a la url http://localhost:3000
