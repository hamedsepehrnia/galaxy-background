# Galaxy Background Animation

[English](#english) | [فارسی](#فارسی)

---

## <a name="english"></a> English

An animated starfield background with a smooth parallax zoom effect. Perfect for adding a dynamic space-themed background to your website.

### Features

- Interactive starfield animation
- Automatic zoom parallax effect
- Smooth 60 FPS animation
- Beautiful gradient overlays
- Responsive and scalable

### Project Structure

```
galaxy-background/
├── index.html              # Demo HTML file
├── css/
│   └── galaxy-background.css  # Stylesheet
├── js/
│   └── galaxy-background.js  # Animation script
└── README.md              # This file
```

### Quick Start

1. Clone or download this repository
2. Include the CSS and JS files in your HTML:

```html
<link rel="stylesheet" href="css/galaxy-background.css">
<script src="js/galaxy-background.js"></script>
```

3. Add a canvas element to your HTML:

```html
<canvas></canvas>
```

That's it! The animation will start automatically.

### Integration Guides

#### Next.js

**1. Install dependencies** (optional - not required):
```bash
# No dependencies needed - vanilla JavaScript
```

**2. Add files to your project:**
- Copy `css/galaxy-background.css` to `public/css/` or `styles/`
- Copy `js/galaxy-background.js` to `public/js/` or `lib/`

**3. Create a component** (`components/GalaxyBackground.jsx`):

```jsx
import { useEffect } from 'react';

export default function GalaxyBackground() {
  useEffect(() => {
    // Import script dynamically
    const script = document.createElement('script');
    script.src = '/js/galaxy-background.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('/css/galaxy-background.css');
      `}</style>
      <canvas></canvas>
    </>
  );
}
```

**4. Use in your layout** (`app/layout.jsx` or `pages/_app.jsx`):

```jsx
import GalaxyBackground from '@/components/GalaxyBackground';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GalaxyBackground />
        {children}
      </body>
    </html>
  );
}
```

**Alternative with CSS Modules** (`styles/galaxy-background.module.css`):

```css
/* Copy contents from galaxy-background.css */
```

Then import in your component:
```jsx
import styles from '@/styles/galaxy-background.module.css';
```

#### React

**1. Add files to `public` folder:**
- `public/css/galaxy-background.css`
- `public/js/galaxy-background.js`

**2. Include in `public/index.html`:**

```html
<link rel="stylesheet" href="%PUBLIC_URL%/css/galaxy-background.css">
<canvas id="galaxy-canvas"></canvas>
<script src="%PUBLIC_URL%/js/galaxy-background.js"></script>
```

**Or create a React component** (`src/components/GalaxyBackground.jsx`):

```jsx
import { useEffect } from 'react';
import '../../public/css/galaxy-background.css';

export default function GalaxyBackground() {
  useEffect(() => {
    // Load script
    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + '/js/galaxy-background.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <canvas id="galaxy-canvas"></canvas>;
}
```

**3. Use in App.js:**

```jsx
import GalaxyBackground from './components/GalaxyBackground';

function App() {
  return (
    <div className="App">
      <GalaxyBackground />
      {/* Your content */}
    </div>
  );
}
```

#### WordPress

**1. Upload files via FTP or WordPress Admin:**
- Upload `css/galaxy-background.css` to your theme's `css` folder
- Upload `js/galaxy-background.js` to your theme's `js` folder

**2. Enqueue in `functions.php`:**

```php
function enqueue_galaxy_background() {
    wp_enqueue_style(
        'galaxy-background-css',
        get_template_directory_uri() . '/css/galaxy-background.css',
        array(),
        '1.0.0'
    );
    wp_enqueue_script(
        'galaxy-background-js',
        get_template_directory_uri() . '/js/galaxy-background.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_galaxy_background');
```

**3. Add canvas to your theme** (in `header.php` or via a hook):

```php
<canvas id="galaxy-canvas"></canvas>
```

**Alternative with Child Theme:**
```php
// In child theme's functions.php
wp_enqueue_style(
    'galaxy-background',
    get_stylesheet_directory_uri() . '/css/galaxy-background.css'
);
wp_enqueue_script(
    'galaxy-background',
    get_stylesheet_directory_uri() . '/js/galaxy-background.js',
    array(),
    '1.0.0',
    true
);
```

#### Django

**1. Add files to static directory:**
- Create `static/css/galaxy-background.css`
- Create `static/js/galaxy-background.js`

**2. In your template** (`base.html` or your main template):

```html
{% load static %}

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{% static 'css/galaxy-background.css' %}">
</head>
<body>
    <canvas></canvas>
    
    <!-- Your content -->
    
    <script src="{% static 'js/galaxy-background.js' %}"></script>
</body>
</html>
```

**3. Ensure static files are configured in `settings.py`:**

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```

**4. For production, collect static files:**
```bash
python manage.py collectstatic
```

#### Vue.js

**1. Add files to `public` folder:**

```
public/
  css/
    galaxy-background.css
  js/
    galaxy-background.js
```

**2. Create a component** (`src/components/GalaxyBackground.vue`):

```vue
<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: 'GalaxyBackground',
  mounted() {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/galaxy-background.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = '/js/galaxy-background.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
</script>
```

**3. Use in your App.vue:**

```vue
<template>
  <div id="app">
    <GalaxyBackground />
    <!-- Your content -->
  </div>
</template>

<script>
import GalaxyBackground from './components/GalaxyBackground.vue';

export default {
  components: {
    GalaxyBackground
  }
}
</script>
```

#### Nuxt.js

**1. Add to `static` folder:**

```
static/
  css/
    galaxy-background.css
  js/
    galaxy-background.js
```

**2. Create a component** (`components/GalaxyBackground.vue`):

```vue
<template>
  <canvas></canvas>
</template>

<script>
export default {
  mounted() {
    if (process.client) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/css/galaxy-background.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = '/js/galaxy-background.js';
      document.body.appendChild(script);
    }
  }
}
</script>
```

**3. Use in `layouts/default.vue`:**

```vue
<template>
  <div>
    <GalaxyBackground />
    <Nuxt />
  </div>
</template>
```

#### Plain HTML / Static Site

Simply include the files:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
  <link rel="stylesheet" href="css/galaxy-background.css">
</head>
<body>
  <canvas></canvas>
  
  <!-- Your content -->
  
  <script src="js/galaxy-background.js"></script>
</body>
</html>
```

### Customization

You can customize the animation by modifying constants in `js/galaxy-background.js`:

```javascript
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;  // Number of stars
const STAR_SIZE = 3;                                              // Base star size
const STAR_MIN_SCALE = 0.2;                                       // Minimum star scale
const OVERFLOW_THRESHOLD = 50;                                    // Boundary threshold
const BASE_VELOCITY_Z = 0.0005;                                   // Zoom speed
```

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### License

This project is open source and available for personal and commercial use.

### Contributing

Contributions, issues, and feature requests are welcome!

---

## <a name="فارسی"></a> فارسی

یک بک‌گراند انیمیشن از ستاره‌ها با افکت parallax zoom خودکار. مناسب برای افزودن بک‌گراند دینامیک با تم فضایی به وب‌سایت شما.

### ویژگی‌ها

- انیمیشن تعاملی ستاره‌ها
- افکت zoom parallax خودکار
- انیمیشن نرم 60 FPS
- گرادیانت‌های زیبا
- واکنش‌گرا و قابل مقیاس

### ساختار پروژه

```
galaxy-background/
├── index.html              # فایل HTML دمو
├── css/
│   └── galaxy-background.css  # استایل‌شیت
├── js/
│   └── galaxy-background.js  # اسکریپت انیمیشن
└── README.md              # این فایل
```

### شروع سریع

1. این ریپازیتوری را کلون یا دانلود کنید
2. فایل‌های CSS و JS را در HTML خود قرار دهید:

```html
<link rel="stylesheet" href="css/galaxy-background.css">
<script src="js/galaxy-background.js"></script>
```

3. یک عنصر canvas به HTML خود اضافه کنید:

```html
<canvas></canvas>
```

همین! انیمیشن به طور خودکار شروع می‌شود.

### راهنمای نصب در پلتفرم‌های مختلف

#### Next.js

**1. نصب وابستگی‌ها** (اختیاری - نیاز نیست):
```bash
# نیازی به وابستگی نیست - جاوااسکریپت خالص
```

**2. اضافه کردن فایل‌ها به پروژه:**
- `css/galaxy-background.css` را در `public/css/` یا `styles/` کپی کنید
- `js/galaxy-background.js` را در `public/js/` یا `lib/` کپی کنید

**3. ساخت کامپوننت** (`components/GalaxyBackground.jsx`):

```jsx
import { useEffect } from 'react';

export default function GalaxyBackground() {
  useEffect(() => {
    // بارگذاری دینامیک اسکریپت
    const script = document.createElement('script');
    script.src = '/js/galaxy-background.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // پاکسازی
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('/css/galaxy-background.css');
      `}</style>
      <canvas></canvas>
    </>
  );
}
```

**4. استفاده در layout** (`app/layout.jsx` یا `pages/_app.jsx`):

```jsx
import GalaxyBackground from '@/components/GalaxyBackground';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GalaxyBackground />
        {children}
      </body>
    </html>
  );
}
```

#### React

**1. اضافه کردن فایل‌ها به پوشه `public`:**
- `public/css/galaxy-background.css`
- `public/js/galaxy-background.js`

**2. قرار دادن در `public/index.html`:**

```html
<link rel="stylesheet" href="%PUBLIC_URL%/css/galaxy-background.css">
<canvas id="galaxy-canvas"></canvas>
<script src="%PUBLIC_URL%/js/galaxy-background.js"></script>
```

**یا ساخت کامپوننت React** (`src/components/GalaxyBackground.jsx`):

```jsx
import { useEffect } from 'react';
import '../../public/css/galaxy-background.css';

export default function GalaxyBackground() {
  useEffect(() => {
    // بارگذاری اسکریپت
    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + '/js/galaxy-background.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <canvas id="galaxy-canvas"></canvas>;
}
```

**3. استفاده در App.js:**

```jsx
import GalaxyBackground from './components/GalaxyBackground';

function App() {
  return (
    <div className="App">
      <GalaxyBackground />
      {/* محتوای شما */}
    </div>
  );
}
```

#### WordPress

**1. آپلود فایل‌ها از طریق FTP یا پنل ادمین:**
- `css/galaxy-background.css` را در پوشه `css` قالب خود آپلود کنید
- `js/galaxy-background.js` را در پوشه `js` قالب خود آپلود کنید

**2. Enqueue در `functions.php`:**

```php
function enqueue_galaxy_background() {
    wp_enqueue_style(
        'galaxy-background-css',
        get_template_directory_uri() . '/css/galaxy-background.css',
        array(),
        '1.0.0'
    );
    wp_enqueue_script(
        'galaxy-background-js',
        get_template_directory_uri() . '/js/galaxy-background.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_galaxy_background');
```

**3. اضافه کردن canvas به قالب** (در `header.php` یا از طریق hook):

```php
<canvas id="galaxy-canvas"></canvas>
```

#### Django

**1. اضافه کردن فایل‌ها به پوشه static:**
- ایجاد `static/css/galaxy-background.css`
- ایجاد `static/js/galaxy-background.js`

**2. در تمپلیت خود** (`base.html` یا تمپلیت اصلی):

```html
{% load static %}

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{% static 'css/galaxy-background.css' %}">
</head>
<body>
    <canvas></canvas>
    
    <!-- محتوای شما -->
    
    <script src="{% static 'js/galaxy-background.js' %}"></script>
</body>
</html>
```

**3. اطمینان از پیکربندی static files در `settings.py`:**

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```

**4. برای production، جمع‌آوری static files:**
```bash
python manage.py collectstatic
```

#### Vue.js

**1. اضافه کردن فایل‌ها به پوشه `public`:**

```
public/
  css/
    galaxy-background.css
  js/
    galaxy-background.js
```

**2. ساخت کامپوننت** (`src/components/GalaxyBackground.vue`):

```vue
<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: 'GalaxyBackground',
  mounted() {
    // بارگذاری CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/galaxy-background.css';
    document.head.appendChild(link);

    // بارگذاری JS
    const script = document.createElement('script');
    script.src = '/js/galaxy-background.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
</script>
```

**3. استفاده در App.vue:**

```vue
<template>
  <div id="app">
    <GalaxyBackground />
    <!-- محتوای شما -->
  </div>
</template>

<script>
import GalaxyBackground from './components/GalaxyBackground.vue';

export default {
  components: {
    GalaxyBackground
  }
}
</script>
```

#### HTML ساده / سایت استاتیک

به سادگی فایل‌ها را شامل کنید:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>وب‌سایت من</title>
  <link rel="stylesheet" href="css/galaxy-background.css">
</head>
<body>
  <canvas></canvas>
  
  <!-- محتوای شما -->
  
  <script src="js/galaxy-background.js"></script>
</body>
</html>
```

### سفارشی‌سازی

می‌توانید انیمیشن را با تغییر ثابت‌ها در `js/galaxy-background.js` سفارشی کنید:

```javascript
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;  // تعداد ستاره‌ها
const STAR_SIZE = 3;                                              // اندازه پایه ستاره
const STAR_MIN_SCALE = 0.2;                                       // کوچک‌ترین مقیاس ستاره
const OVERFLOW_THRESHOLD = 50;                                    // آستانه مرز
const BASE_VELOCITY_Z = 0.0005;                                   // سرعت زوم
```

### پشتیبانی مرورگر

- Chrome/Edge (آخرین نسخه)
- Firefox (آخرین نسخه)
- Safari (آخرین نسخه)
- مرورگرهای موبایل (iOS Safari، Chrome Mobile)

### مجوز

این پروژه منبع باز است و برای استفاده شخصی و تجاری در دسترس است.

### مشارکت

مشارکت‌ها، مسائل و درخواست‌های ویژگی مورد استقبال است!

---

Made with love
