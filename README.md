# Food Store - Carrito de Compras

**Evaluación:** Primer Parcial - Programación III  
**Alumno:** Luis Cisneros  
**Fecha:** Abril 2026

## Descripción del Proyecto

Food Store es una aplicación frontend de catálogo de productos con carrito de compras persistente. Desarrollada con HTML5, CSS3, JavaScript y TypeScript (sin frameworks), implementa funcionalidades de búsqueda, filtrado por categoría y carrito con localStorage.

## Características Principales

✅ **Catálogo Dinámico:** Visualiza productos con nombre, descripción, precio e imagen
✅ **Búsqueda:** Filtra productos por nombre en tiempo real
✅ **Filtrado por Categoría:** Organiza productos por categorías (Pizzas, Hamburguesas, Bebidas, etc.)
✅ **Carrito Persistente:** Guarda productos en localStorage, permitiendo recuperarlos tras recargar
✅ **Gestión de Cantidad:** Incrementa/decrementa cantidades de productos en el carrito
✅ **Cálculo Automático:** Suma total actualizada dinámicamente

## Requisitos Técnicos Implementados

- **HTML5 + CSS3:** Maquetación semántica y estilos responsivos
- **JavaScript/TypeScript:** Lógica sin frameworks, manipulación directa del DOM
- **localStorage:** Persistencia de datos del carrito
- **Vite:** Build tool configurado para múltiples puntos de entrada
- **Git:** Versionado con commits significativos

## Instrucciones para Ejecutar

### 1. Clonar el repositorio 
```bash
git clone  https://github.com/luiscisneros356/UTN-TUaD-Prog3-Parcial_N1
rama master

```

### 2. Instalar dependencias
```bash
pnpm install
```
*Si no tienes pnpm instalado: `npm install -g pnpm`*

### 3. Ejecutar en desarrollo
```bash
pnpm dev
```
Se abrirá en: `http://localhost:5173/`

### 4. Acceder a la aplicación
- **Catálogo:** http://localhost:5173/src/pages/store/home/home.html
- **Carrito:** http://localhost:5173/src/pages/store/cart/cart.html

### 5. Build para producción
```bash
pnpm build
```
Los archivos compilados estarán en la carpeta `dist/`

## Estructura del Proyecto

```
src/
├── pages/
│   └── store/
│       ├── home/
│       │   ├── home.html      # Catálogo de productos
│       │   └── home.ts        # Lógica: render, búsqueda, filtros
│       └── cart/
│           ├── cart.html      # Vista del carrito
│           └── cart.ts        # Lógica: render, cantidades, total
├── types/
│   ├── product.ts             # Interfaces Product y CartItem
│   └── categoria.ts           # Interface ICategory
├── data/
│   └── data.ts                # PRODUCTS array y getCategories()
├── utils/
│   └── cart.ts                # Lógica centralizada del carrito
├── style.css                  # Estilos globales
└── main.ts                    # Punto de entrada
```

## Criterios de Aceptación Cumplidos

### HU-P1-01: Búsqueda de Productos
- ✅ Campo de búsqueda visible en el catálogo
- ✅ Filtra productos por nombre (parcial e insensible a mayúsculas)
- ✅ Muestra mensaje "No se encontraron productos para tu búsqueda" cuando no hay coincidencias

### HU-P1-02: Filtrado por Categoría
- ✅ Categorías visibles en menú lateral
- ✅ Botón "Ver Todo" para volver al catálogo completo
- ✅ Filtrado funciona combinado con búsqueda

### HU-P1-03: Agregar al Carrito
- ✅ Botón "Agregar al carrito" en cada producto
- ✅ Feedback visual: Alert de confirmación
- ✅ Si producto existe, incrementa cantidad (no duplica)

### HU-P1-04: Visualizar Carrito
- ✅ Página accesible desde navegación
- ✅ Muestra: nombre, precio y cantidad de cada producto
- ✅ Botones para incrementar/decrementar cantidad
- ✅ Botón "Eliminar" con confirmación
- ✅ Mensaje cuando carrito está vacío

### HU-P1-05: Calcular Total
- ✅ Total mostrado en sección "Resumen"
- ✅ Cálculo correcto: suma de (precio × cantidad) de todos los items
- ✅ Se actualiza dinámicamente

## Tecnologías Usadas

- **Vite 7.3.1** - Build tool y dev server
- **TypeScript 5.8.3** - Lenguaje tipado
- **pnpm 10.33.2** - Gestor de paquetes

## Notas Importantes

- No se implementó checkout ni conexión con backend (fuera del alcance del parcial)
- Los datos de productos se encuentran en `src/data/data.ts`
- El carrito persiste mientras no se limpie el localStorage del navegador
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

---
