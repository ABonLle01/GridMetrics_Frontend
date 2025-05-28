# GridMetrics Frontend

Interfaz web del proyecto **GridMetrics**, una aplicación para visualizar y consultar datos actualizados de la Fórmula 1. Esta parte del proyecto está desarrollada con **React**, **React Router DOM** y **Bootstrap 5**, y se comunica con una API REST construida en Node.js con Express y MongoDB.

---

## Tecnologías utilizadas

- React 19
- React Router DOM
- Bootstrap 5 + React Bootstrap
- Vite
- Axios

---

## Configuración del entorno

1. Clona el repositorio:
    ```
    git clone https://github.com/tu-usuario/gridmetrics_frontend.git
    cd gridmetrics_frontend

2. Instala las dependencias
    ```
    npm install

3. Crea un archivo `.env` en la raiz del proyecto con la siguiente variable:
    ```
    VITE_BACKEND_URL=https://gridmetrics-backend.onrender.com/

4. Inicia el servidor de desarrollo:
    ```
    npm run dev


## Estructura del proyecto

+ `/src/components/`: Componentes reutilizables y vistas de la App.
+ `/src/utils/`: Funciones auxiliares que sirven de apoyo a la hora de mostrar los datos.
+ `main.jsx`: Archivo principal del proyecto. 
+ `App.jsx`: Enrutador de toda la aplicacion web.

## Scripts disponibles

+ `npm run dev` - Lanza el servidor en modo de desarrollo.
+ `npm run build` - Compila para la producción.
+ `npm run preview` - Sirve la build para pruebas locales.

## Backend

Este frontend se conecta con el backend del proyecto disponible en:
> https://gridmetrics-backend.onrender.com/


