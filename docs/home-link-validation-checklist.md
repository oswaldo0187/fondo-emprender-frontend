# Validacion de enlaces y navegacion (Home)

## Ejecucion automatica

1. Instalar dependencias:

```bash
cd frontend
npm install
```

2. Instalar navegador de Playwright (solo la primera vez):

```bash
npx playwright install chromium
```

3. Ejecutar validacion de home:

```bash
npm run validate:home-links
```

## Cobertura automatizada

- Enlaces internos:
  - Recorre todos los links internos de la home.
  - Detecta links mal formados (espacios, null, undefined, doble query marker).
  - Falla si una ruta responde con 404 o redirige a una pagina 404.
- Enlaces externos:
  - Identifica links externos por origen distinto.
  - Valida uso de target="_blank".
  - Valida uso de rel="noopener noreferrer".
- Navegacion por teclado:
  - Recorre elementos interactivos con Tab.
  - Valida que haya foco visible en los elementos enfocados.
  - Verifica Shift+Tab y activacion con Enter.
- Errores de consola y navegacion:
  - Captura console.error durante el recorrido.
  - Captura respuestas HTTP 404 durante navegacion.
- URLs amigables:
  - Falla si encuentra query params en links internos de la home.

## Checklist manual

1. Abrir la home en navegador de escritorio y movil.
2. Navegar con Tab por todos los enlaces/botones visibles.
3. Verificar que cada foco sea claramente visible (outline, ring o sombra de foco).
4. Usar Shift+Tab para confirmar navegacion inversa correcta.
5. Presionar Enter sobre enlaces clave y confirmar navegacion esperada.
6. Abrir DevTools y validar que no haya 404 ni errores de consola al navegar.
7. Verificar que rutas publicas sean limpias (sin query params innecesarios).

## Plantilla de comentario tecnico (tarea)

```md
### Validacion de enlaces y navegacion - Home

Fecha: YYYY-MM-DD
Responsable: <nombre>

Automatizado:
- Comando: npm run validate:home-links
- Resultado: PASS | FAIL
- Evidencia: <link al pipeline o captura>

Hallazgos:
- Enlaces internos rotos: <ninguno o lista>
- Enlaces externos sin seguridad target/rel: <ninguno o lista>
- Errores de consola / 404: <ninguno o lista>
- Problemas de foco o teclado: <ninguno o lista>
- URLs no amigables: <ninguno o lista>

Acciones:
1. <accion 1>
2. <accion 2>

Riesgos residuales:
- <si aplica>
```