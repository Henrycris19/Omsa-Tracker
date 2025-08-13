# OMSA Bus Tracker

Aplicación web y móvil para rastrear autobuses de OMSA (Oficina Metropolitana de Servicios de Autobuses) en Santo Domingo, República Dominicana.

## 🚀 Características

- 🗺️ **Mapa interactivo** con Google Maps
- 🚌 **Simulación en tiempo real** de autobuses
- 📍 **Paradas cercanas** con información detallada
- ⭐ **Sistema de favoritos**
- 📱 **Interfaz responsiva** para web y móvil
- 🔄 **Actualización automática** cada 3 segundos

## 🛠️ Tecnologías

- **React Native** + **Expo**
- **TypeScript**
- **Google Maps API**
- **React Native Reanimated**
- **Expo Router**

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd omsa-project

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

## 🌐 Despliegue Web

### Con Vercel (Recomendado)

1. **Crear cuenta en [Vercel](https://vercel.com)**
2. **Conectar tu repositorio de GitHub**
3. **Configurar el proyecto:**
   - Framework Preset: `Other`
   - Build Command: `npm run build:web`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Variables de entorno:**
   - `GOOGLE_MAPS_API_KEY`: Tu API key de Google Maps

5. **Desplegar**

### Manual

```bash
# Construir para web
npm run build:web

# Los archivos se generan en la carpeta dist/
```

## 📱 Desarrollo Móvil

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 🔧 Configuración

### Google Maps API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto y habilita Maps JavaScript API
3. Genera una API key
4. Configúrala en `app.json` y variables de entorno

## 📄 Licencia

MIT License

