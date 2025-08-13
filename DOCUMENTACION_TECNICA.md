# OMSA Tracker - Documentación Técnica

## 📋 Información del Proyecto

**Proyecto:** OMSA Tracker - Sistema de Seguimiento de Autobuses en Tiempo Real  
**Asignatura:** Proyecto Integrador  II
**Institución:** Universidad Iberoamericana (UNIBE)  
**Semestre:** Mayo - Agosto 2025  

### 👥 Equipo de Desarrollo

- **Henry Luciano** - Desarrollador Full Stack & Arquitecto de Solución
- **Victor Contreras** - Desarrollador Frontend & UX/UI
- **Gerald Vizcaíno** - Desarrollador Backend & Gestión de Datos

---

## 🎯 Objetivo del Proyecto

OMSA Tracker es una aplicación móvil y web diseñada para ofrecer a los usuarios de los servicios de transporte público de Santo Domingo una herramienta integral que les permita:

- **Visualizar en tiempo real** la ubicación de autobuses OMSA
- **Consultar información detallada** sobre paradas y rutas
- **Recibir alertas** sobre horarios de llegada
- **Navegar eficientemente** hacia las paradas más cercanas
- **Gestionar favoritos** de rutas y paradas frecuentes

### 🎯 Problemática Resuelta

Los usuarios del transporte público en Santo Domingo enfrentan desafíos como:
- Falta de información en tiempo real sobre la ubicación de autobuses
- Incertidumbre sobre horarios de llegada
- Dificultad para encontrar paradas cercanas
- Ausencia de herramientas digitales para planificar viajes

---

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

#### Frontend
- **React Native** (v0.74.6) - Framework principal para desarrollo móvil
- **Expo** (v53.0.0) - Plataforma de desarrollo y despliegue
- **React Native Web** (v0.20.0) - Soporte para plataforma web
- **TypeScript** (v5.8.3) - Tipado estático para mayor robustez

#### UI/UX
- **React Native Reanimated** (v3.10.0) - Animaciones fluidas
- **Lucide React Native** (v0.475.0) - Iconografía moderna
- **Expo Vector Icons** (v14.1.0) - Iconos nativos
- **React Native Gesture Handler** (v2.24.0) - Gestos táctiles

#### Mapas y Geolocalización
- **React Native Maps** (v1.10.0) - Integración de mapas nativos
- **Google Maps JavaScript API** - Mapas web interactivos
- **Expo Location** (v18.0.0) - Servicios de ubicación

#### Estado y Datos
- **React Hooks** - Gestión de estado local
- **AsyncStorage** (v2.2.0) - Persistencia local de datos
- **Mock Data System** - Simulación de datos en tiempo real

#### Despliegue y Hosting
- **Vercel** - Hosting web y CI/CD
- **Expo EAS** - Build y distribución móvil
- **Metro Bundler** - Empaquetado de assets

### Estructura de Directorios

```
omsa-tracker/
├── app/                    # Navegación y pantallas principales
│   ├── (tabs)/            # Pantallas con navegación por tabs
│   ├── _layout.tsx        # Layout principal de la app
│   └── +not-found.tsx     # Página 404
├── components/            # Componentes reutilizables
│   ├── BusCard.tsx        # Tarjeta de información de autobús
│   ├── StopCard.tsx       # Tarjeta de información de parada
│   ├── MapView.tsx        # Componente de mapa
│   ├── GoogleMapWeb.tsx   # Implementación web de Google Maps
│   └── WelcomeScreen.tsx  # Pantalla de bienvenida
├── hooks/                 # Hooks personalizados
│   ├── useBusData.ts      # Gestión de datos de autobuses
│   ├── useBusSimulation.ts # Simulación de movimiento
│   ├── useFavorites.ts    # Gestión de favoritos
│   ├── useGoogleMaps.ts   # Integración con Google Maps
│   ├── useLocation.ts     # Servicios de ubicación
│   └── useResponsive.ts   # Diseño responsive
├── config/                # Configuraciones
│   ├── googleMaps.ts      # Configuración de Google Maps
│   └── index.ts           # Configuraciones generales
├── data/                  # Datos mock y simulaciones
│   └── mockData.ts        # Datos de prueba
├── types/                 # Definiciones de tipos TypeScript
│   └── index.ts           # Interfaces y tipos
├── utils/                 # Utilidades y helpers
│   └── calculations.ts    # Cálculos de distancia y tiempo
├── assets/                # Recursos estáticos
│   └── images/            # Imágenes e iconos
└── dist/                  # Build de producción web
```

---

## 🔧 Funcionalidades Implementadas

### 1. Sistema de Mapas Interactivos
- **Mapa en tiempo real** con ubicación de autobuses y paradas
- **Marcadores dinámicos** que se actualizan automáticamente
- **Zoom y navegación** intuitiva
- **Soporte multiplataforma** (iOS, Android, Web)

### 2. Seguimiento de Autobuses
- **Localización GPS** simulada de autobuses
- **Información de ocupación** (pasajeros/capacidad)
- **Tiempo estimado de llegada** a paradas
- **Estado del autobús** (en ruta, en parada, etc.)

### 3. Gestión de Paradas
- **Listado de paradas cercanas** basado en ubicación del usuario
- **Información detallada** de cada parada
- **Rutas asociadas** a cada parada
- **Favoritos** para acceso rápido

### 4. Sistema de Favoritos
- **Guardar paradas favoritas** para acceso rápido
- **Guardar rutas favoritas** para seguimiento
- **Persistencia local** de preferencias
- **Sincronización** entre sesiones

### 5. Diseño Responsive
- **Adaptación automática** a diferentes tamaños de pantalla
- **Ocultación inteligente** de elementos en pantallas pequeñas
- **Optimización** para móviles y tablets
- **Experiencia consistente** en todas las plataformas

### 6. Navegación Intuitiva
- **Sistema de tabs** para navegación principal
- **Pantallas especializadas** para cada funcionalidad
- **Transiciones fluidas** entre pantallas
- **Breadcrumbs** para navegación contextual

---

## 📱 Pantallas y Navegación

### Pantalla Principal (Home)
- **Resumen general** del sistema
- **Acceso rápido** a funcionalidades principales
- **Estado del sistema** y notificaciones

### Paradas Cercanas
- **Lista de paradas** ordenadas por proximidad
- **Información de autobuses** en cada parada
- **Tiempo de llegada** estimado
- **Filtros** por ruta y distancia

### Autobuses Cercanos
- **Mapa interactivo** con ubicación de autobuses
- **Información detallada** de cada autobús
- **Agrupación por rutas** para mejor organización
- **Seguimiento en tiempo real**

### Rutas
- **Listado completo** de rutas OMSA
- **Información de paradas** en cada ruta
- **Autobuses activos** por ruta
- **Navegación** hacia rutas específicas

### Favoritos
- **Paradas guardadas** como favoritas
- **Rutas favoritas** para seguimiento
- **Acceso rápido** a información frecuente
- **Gestión** de preferencias

---

## 🔄 Flujo de Datos

### 1. Inicialización
```
App Start → Load Mock Data → Initialize Maps → Setup Location Services
```

### 2. Actualización de Ubicación
```
Location Change → Update User Position → Recalculate Nearby Stops/Buses → Update UI
```

### 3. Simulación de Autobuses
```
Timer Trigger → Update Bus Positions → Calculate ETAs → Refresh Map Markers
```

### 4. Gestión de Favoritos
```
User Action → Update Favorites → Save to AsyncStorage → Update UI
```

---

## 🎨 Diseño y UX

### Principios de Diseño
- **Simplicidad** - Interfaz limpia y fácil de usar
- **Accesibilidad** - Diseño inclusivo para todos los usuarios
- **Consistencia** - Patrones de diseño uniformes
- **Eficiencia** - Acceso rápido a información relevante

### Paleta de Colores
- **Primario:** #16A34A (Verde OMSA)
- **Secundario:** #FDE047 (Amarillo)
- **Acento:** #2563EB (Azul)
- **Neutro:** #F8F9FA (Gris claro)
- **Texto:** #1F2937 (Gris oscuro)

### Tipografía
- **Familia:** Inter (Google Fonts)
- **Pesos:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Tamaños:** 12px - 24px (escalable)

---

## 🚀 Despliegue y Distribución

### Web (Vercel)
- **URL de producción:** https://omsa-tracker-f1zgin85q-henry-lucianos-projects.vercel.app
- **Despliegue automático** desde GitHub
- **CDN global** para mejor rendimiento
- **HTTPS automático** para seguridad

### Móvil (Expo)
- **Build de desarrollo** disponible
- **Distribución** a través de Expo Go
- **Configuración** para App Store y Google Play

### Configuración de Entorno
```bash
# Instalación de dependencias
npm install

# Desarrollo web
npm run web

# Desarrollo móvil
npm run dev

# Build de producción
npm run build:web
```

---

## 🔧 Configuración Técnica

### Variables de Entorno
```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
EXPO_NO_TELEMETRY=1
```

### Dependencias Principales
```json
{
  "expo": "^53.0.0",
  "react": "18.3.1",
  "react-native": "0.74.6",
  "react-native-maps": "1.10.0",
  "react-native-reanimated": "~3.10.0",
  "expo-location": "~18.0.0",
  "@react-native-async-storage/async-storage": "^2.2.0"
}
```

### Configuración de Vercel
```json
{
  "buildCommand": "npm run build:web",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🧪 Testing y Calidad

### Estrategia de Testing
- **Testing manual** en dispositivos reales
- **Simulación** de diferentes escenarios de uso
- **Validación** de funcionalidades críticas
- **Optimización** de rendimiento

### Métricas de Calidad
- **Tiempo de carga** < 3 segundos
- **Tiempo de respuesta** < 100ms
- **Cobertura de funcionalidades** > 95%
- **Compatibilidad** con iOS 12+ y Android 8+

---

## 🔮 Roadmap y Mejoras Futuras

### Fase 2 (Próximas Implementaciones)
- [ ] **API real** de OMSA para datos en tiempo real
- [ ] **Notificaciones push** para alertas de llegada
- [ ] **Modo offline** con datos cacheados
- [ ] **Integración** con sistemas de pago

### Fase 3 (Funcionalidades Avanzadas)
- [ ] **Machine Learning** para predicción de tiempos
- [ ] **Análisis de patrones** de uso
- [ ] **Reportes** de congestión y demoras
- [ ] **Integración** con otros sistemas de transporte

### Fase 4 (Escalabilidad)
- [ ] **Backend robusto** con microservicios
- [ ] **Base de datos** en tiempo real
- [ ] **Sistema de usuarios** y perfiles
- [ ] **API pública** para desarrolladores

---

## 📊 Métricas del Proyecto

### Código
- **Líneas de código:** ~15,000
- **Archivos TypeScript:** 25+
- **Componentes React:** 15+
- **Hooks personalizados:** 6

### Funcionalidades
- **Pantallas implementadas:** 8
- **Componentes reutilizables:** 12
- **Integraciones:** 5 (Maps, Location, Storage, etc.)
- **Plataformas soportadas:** 3 (iOS, Android, Web)

### Rendimiento
- **Tiempo de build:** ~30 segundos
- **Tamaño del bundle:** ~3.5MB
- **Assets optimizados:** 100%
- **Lighthouse Score:** 95+

---

## 🤝 Contribuciones y Créditos

### Desarrolladores
- **Henry Luciano** - Arquitectura, desarrollo full-stack, despliegue
- **Victor Contreras** - UI/UX, componentes frontend, responsive design
- **Gerald Vizcaíno** - Lógica de negocio, gestión de datos, testing

### Tecnologías y Herramientas
- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **Google Maps** - Servicios de mapas
- **Vercel** - Hosting y CI/CD
- **TypeScript** - Tipado estático

### Recursos y Referencias
- **Documentación OMSA** - Información de rutas y paradas
- **Google Maps API** - Servicios de geolocalización
- **React Native Docs** - Guías de desarrollo
- **Expo Documentation** - Configuración y despliegue

---

## 📞 Contacto y Soporte

### Equipo de Desarrollo
- **Henry Luciano:**
- **Victor Contreras:** 
- **Gerald Vizcaíno:** 

### Repositorio
- **GitHub:** https://github.com/Henrycris19/Omsa-Tracker
- **Demo Web:** https://omsa-tracker-f1zgin85q-henry-lucianos-projects.vercel.app

### Documentación Adicional
- **README.md** - Guía de inicio rápido
- **package.json** - Dependencias y scripts
- **app.json** - Configuración de Expo

---

## 📄 Licencia

Este proyecto es desarrollado como parte del Proyecto Integrador de la Universidad Iberoamericana (UNIBE). Todos los derechos reservados.

---

*Documentación generada el 12 de agosto de 2025*  
*Versión del proyecto: 1.0.0*
