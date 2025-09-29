There is currently no English document available
Please use translation software

\[[中文文档](../../README.md)\] | \[English\]
# Looplan

Vue3 cloud component library development, designed for developing and using cloud components, and encapsulating common JS libraries for rapid development.
- Currently in development stage, not recommended for production use
- Technical discussion QQ group: 1047604746

# Feature Planning
Checked items are implemented features, unchecked items are pending development

- [x] Cloud Component Loading
- [x] - - Custom Component Loading
- [x] - - Configurable Cloud Component Loading
- [x] - - Component Style Management
- [ ] - - Cloud Component Upload Service
- [ ] Common JS Modules
- [x] - - [JS Data Types](../../src\lib\data-type\src\JsDataType.ts)
- [x] - - API Access Encapsulation
- [ ] - - File Upload Encapsulation
- [ ] - - Cloud Function Integration

- [ ] Cloud Layout
- [ ] - - Layout Rendering
- [ ] - - Layout Rendering - Custom Slots

# Usage
```bash
# Individual installation
cnpm i looplan -D
# Including core features
cnpm i looplan vue axios -D
```

## Cloud Component Usage

### Using Cloud Components

```vue
<template>
  <!-- Use the built-in lp-component to load online components -->
  <lp-component is="ElementPlus@ElButton" type="primary">
    ElementPlus Button
  </lp-component>
  
  <!-- Or use the loadComponent function -->
  <component :is="loadComponent('ElementPlus@ElButton')" type="primary">
    ElementPlus Button
  </component>
</template>

<script setup>
import { loadComponent } from 'looplan';

// Usage code...
</script>
```

### Registering Cloud Components

```js
import { registerPackage } from 'looplan';

// Register Element Plus component library
registerPackage({
  name: 'ElementPlus',
  title: 'ElementPlus Component Library',
  type: 'cdn',
  cdn: 'https://unpkg.com/element-plus@__version__/dist/index.full.js',
  styleCdn: [
    "https://unpkg.com/element-plus@__version__/dist/index.css"
  ],
  styleImportCase: "register", // Style import timing: register or use
  version: '2.9.8',
  keepOfWindow: true, // Whether to keep the component library on window
  components: [
    // Supports string and object forms
    "ElText",
    {
      title: 'Button',
      name: 'ElButton',
      modelType: 'none',
      // Component-level style configuration
      styleCdn: [
        "https://unpkg.com/element-plus@__version__/dist/xxx.css"
      ],
      styleImportCase: "use", // Component-level style import timing
      // Other configurations
      config: {
        myConfigItem: 'Custom configuration item'
      }
    }
  ]
});
```

### Style Management

Looplan provides comprehensive style management functionality, allowing styles to be imported at registration or usage time, and supports dynamic unloading of styles.

#### Style Import Timing

- `register`: Import styles when the component package is registered (default)
- `use`: Import styles when the component is used

Style import timing can be configured at both package level and component level:

```js
// Package-level configuration
registerPackage({
  // ...
  styleImportCase: "register",
  // ...
});

// Component-level configuration
registerPackage({
  // ...
  components: [
    {
      // ...
      styleImportCase: "use",
      // ...
    }
  ]
});
```

#### Style Management API

```js
import { 
  loadPackageStyles,
  unloadPackageStyles,
  unloadComponentStyles,
  getLoadedStyleLinks
} from 'looplan';

// Manually load package styles
await loadPackageStyles('ElementPlus');

// Unload package styles (also unloads all component styles under this package)
unloadPackageStyles('ElementPlus');

// Unload specific component styles
unloadComponentStyles('ElementPlus@ElButton');

// Get all currently loaded styles
const styleLinks = getLoadedStyleLinks();
```

#### Style Loading Error Handling

- Package-level styles: Throws an exception when loading fails
- Component-level styles: Only prints error messages to the console when loading fails, does not affect component rendering

## Cloud Component Development

## File Upload
