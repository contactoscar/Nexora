# 🚀 Nexora - Proyecto Completo

Plataforma integral de IA para consultores by Qaracter

## 📋 Contenido del Proyecto

```
nexora-completo/
├── api/
│   └── chat.js              # Backend serverless para chatbot
├── public/
│   ├── index.html           # Página principal con chatbot con memoria
│   ├── optimizar.html       # Optimizador de prompts
│   ├── practicar.html       # Práctica contrarreloj
│   ├── ranking.html         # Ranking de IAs
│   ├── flujos.html          # Flujos de trabajo con IA
│   ├── noticias.html        # Noticias de IA
│   ├── aprendizaje.html     # Cursos y formación
│   ├── automatizacion.html  # Plataformas de automatización
│   ├── formulario.html      # Formulario de sugerencias
│   ├── roles.html           # Roles profesionales
│   ├── testIntro.html       # Test: Introducción a la IA
│   ├── testPE.html          # Test: Prompt Engineering
│   ├── testIntegracion.html # Test: Integración de IA
│   ├── testEtica.html       # Test: Ética y Gobernanza
│   ├── insigniasIntro.html  # Generador de insignias Intro
│   ├── insigniasPE.html     # Generador de insignias PE
│   ├── insigniasIntegracion.html
│   └── insigniasEtica.html
├── vercel.json
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

## ✅ Características

- ✅ Chatbot con memoria persistente (localStorage)
- ✅ Backend seguro (API key protegida)
- ✅ Límite de 15 mensajes (control de costos)
- ✅ Optimizador de prompts
- ✅ Práctica contrarreloj
- ✅ Ranking de IAs
- ✅ Flujos de trabajo
- ✅ Noticias actualizadas
- ✅ 4 cursos con tests
- ✅ Generador de insignias PDF

## 🚀 Guía de Despliegue

### Paso 1: GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/nexora.git
git push -u origin main
```

### Paso 2: Vercel (Backend)
1. Conecta GitHub con Vercel
2. Importa el proyecto
3. **IMPORTANTE:** Añade variable de entorno:
   - Name: `OPENAI_API_KEY`
   - Value: tu API key
4. Deploy

### Paso 3: Actualizar URLs
Edita estos archivos con tu URL de Vercel:
- `public/index.html` (línea ~503)
- `public/optimizar.html` (línea ~300)
- `public/practicar.html` (línea ~97)

Busca y reemplaza:
```javascript
const BACKEND_URL = "https://tu-proyecto.vercel.app/api/chat";
```
Por tu URL real de Vercel.

### Paso 4: GitHub Pages
1. Settings → Pages
2. Source: `main` branch, carpeta `/public`
3. Save

Tu sitio estará en: `https://TU_USUARIO.github.io/nexora/`

## 🔐 Seguridad

✅ API Key protegida en variables de entorno  
✅ Frontend sin claves expuestas  
✅ CORS configurado correctamente

## 💰 Costos

- Vercel: GRATIS
- GitHub Pages: GRATIS
- OpenAI: Solo uso real
- Chatbot: Control de costos (15 mensajes)

## 🛠️ Solución de Problemas

### El chat no responde
- Verifica `OPENAI_API_KEY` en Vercel
- Comprueba URL del backend en archivos HTML

### Error CORS
- Verifica `vercel.json`
- Redespliega en Vercel

### Historial no se guarda
- Verifica localStorage en navegador
- Prueba en modo incógnito

## 📝 Personalización

### Cambiar límite de mensajes
En `public/index.html`:
```javascript
const MAX_MESSAGES = 15; // Cambia este número
```

## 🎉 ¡Listo!

Nexora está completo y desplegado de forma segura.

© 2025 Nexora by Qaracter
