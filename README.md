# 🚌 OMSA Tracker

**Sistema de Seguimiento de Autobuses en Tiempo Real para Santo Domingo**

[![Deploy with Vercel](https://vercel.com/button)](https://omsa-tracker-f1zgin85q-henry-lucianos-projects.vercel.app)
[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)

## 📋 Información del Proyecto

**Proyecto:** OMSA Tracker - Sistema de Seguimiento de Autobuses en Tiempo Real  
**Asignatura:** Proyecto Integrador  
**Institución:** Universidad Iberoamericana (UNIBE)  
**Semestre:** Mayo - Agosto 2025  

### 👥 Equipo de Desarrollo

- **Henry Luciano** - Desarrollador Full Stack & Arquitecto de Solución
- **Victor Contreras** - Desarrollador Frontend & UX/UI  
- **Gerald Vizcaíno** - Desarrollador Backend & Gestión de Datos

---

## 🎯 Objetivo

OMSA Tracker es una aplicación móvil y web diseñada para ofrecer a los usuarios de los servicios de transporte público de Santo Domingo una herramienta integral que les permita:

- **Visualizar en tiempo real** la ubicación de autobuses OMSA
- **Consultar información detallada** sobre paradas y rutas
- **Recibir alertas** sobre horarios de llegada
- **Navegar eficientemente** hacia las paradas más cercanas
- **Gestionar favoritos** de rutas y paradas frecuentes

---

## 🚀 Demo en Vivo

**🌐 Aplicación Web:** [https://omsa-tracker-f1zgin85q-henry-lucianos-projects.vercel.app](https://omsa-tracker-f1zgin85q-henry-lucianos-projects.vercel.app)

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React Native, Expo, TypeScript
- **Mapas:** Google Maps API, React Native Maps
- **UI/UX:** React Native Reanimated, Lucide Icons
- **Estado:** React Hooks, AsyncStorage
- **Despliegue:** Vercel, Expo EAS
- **Geolocalización:** Expo Location

---

## 📱 Funcionalidades Principales

### 🗺️ Sistema de Mapas Interactivos
- Mapa en tiempo real con ubicación de autobuses y paradas
- Marcadores dinámicos que se actualizan automáticamente
- Zoom y navegación intuitiva
- Soporte multiplataforma (iOS, Android, Web)

### 🚌 Seguimiento de Autobuses
- Localización GPS simulada de autobuses
- Información de ocupación (pasajeros/capacidad)
- Tiempo estimado de llegada a paradas
- Estado del autobús (en ruta, en parada, etc.)

### 🏁 Gestión de Paradas
- Listado de paradas cercanas basado en ubicación del usuario
- Información detallada de cada parada
- Rutas asociadas a cada parada
- Favoritos para acceso rápido

### ⭐ Sistema de Favoritos
- Guardar paradas favoritas para acceso rápido
- Guardar rutas favoritas para seguimiento
- Persistencia local de preferencias
- Sincronización entre sesiones

### 📱 Diseño Responsive
- Adaptación automática a diferentes tamaños de pantalla
- Ocultación inteligente de elementos en pantallas pequeñas
- Optimización para móviles y tablets
- Experiencia consistente en todas las plataformas

---

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Expo CLI
- Cuenta de Google Maps (para API key)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Henrycris19/Omsa-Tracker.git
cd Omsa-Tracker

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu API key de Google Maps

# Ejecutar en desarrollo
npm run dev          # Desarrollo móvil
npm run web          # Desarrollo web
```

### Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run web          # Ejecutar en navegador web
npm run android      # Ejecutar en Android
npm run ios          # Ejecutar en iOS
npm run build:web    # Build para producción web
npm run lint         # Ejecutar linter
```

---

## 📁 Estructura del Proyecto

```
omsa-tracker/
├── app/                    # Navegación y pantallas principales
├── components/            # Componentes reutilizables
├── hooks/                 # Hooks personalizados
├── config/                # Configuraciones
├── data/                  # Datos mock y simulaciones
├── types/                 # Definiciones de tipos TypeScript
├── utils/                 # Utilidades y helpers
├── assets/                # Recursos estáticos
└── dist/                  # Build de producción web
```

---

## 🎨 Diseño

### Paleta de Colores
- **Primario:** #16A34A (Verde OMSA)
- **Secundario:** #FDE047 (Amarillo)
- **Acento:** #2563EB (Azul)
- **Neutro:** #F8F9FA (Gris claro)
- **Texto:** #1F2937 (Gris oscuro)

### Principios de Diseño
- **Simplicidad** - Interfaz limpia y fácil de usar
- **Accesibilidad** - Diseño inclusivo para todos los usuarios
- **Consistencia** - Patrones de diseño uniformes
- **Eficiencia** - Acceso rápido a información relevante

---

## 📊 Métricas del Proyecto

- **Líneas de código:** ~15,000
- **Archivos TypeScript:** 25+
- **Componentes React:** 15+
- **Hooks personalizados:** 6
- **Pantallas implementadas:** 8
- **Plataformas soportadas:** 3 (iOS, Android, Web)

---

## 🔮 Roadmap

### Fase 2 (Próximas Implementaciones)
- [ ] API real de OMSA para datos en tiempo real
- [ ] Notificaciones push para alertas de llegada
- [ ] Modo offline con datos cacheados
- [ ] Integración con sistemas de pago

### Fase 3 (Funcionalidades Avanzadas)
- [ ] Machine Learning para predicción de tiempos
- [ ] Análisis de patrones de uso
- [ ] Reportes de congestión y demoras
- [ ] Integración con otros sistemas de transporte

---

## 📚 Documentación

Para información técnica detallada, arquitectura del sistema, configuración avanzada y más, consulta:

**[📖 Documentación Técnica Completa](DOCUMENTACION_TECNICA.md)**

---

## 🤝 Contribuciones

Este proyecto es desarrollado como parte del Proyecto Integrador de la Universidad Tecnológica de Santiago (UTESA). 

### Contacto del Equipo
- **Henry Luciano:** henry.luciano@utesa.edu.do
- **Victor Contreras:** victor.contreras@utesa.edu.do
- **Gerald Vizcaíno:** gerald.vizcaino@utesa.edu.do

---

## 📄 Licencia

Este proyecto es desarrollado como parte del Proyecto Integrador de la Universidad Iberoamericana (UNIBE). Todos los derechos reservados.

---

## 🔗 Enlaces Útiles

- **Repositorio:** https://github.com/Henrycris19/Omsa-Tracker
- **Demo Web:** https://omsa-tracker-f1zgin85q-henry-lucianos-projects.vercel.app
- **Documentación Técnica:** [DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md)

---

*Desarrollado con ❤️ por el equipo de OMSA Tracker*  
*Universidad Iberoamericana (UNIBE) - 2025*

