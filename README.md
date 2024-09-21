# Modernized EasyZoom

Modernized EasyZoom is a lightweight, easy-to-use JavaScript library for implementing image zoom functionality on web pages. This project is a modernized version of the original EasyZoom, rewritten in pure JavaScript without jQuery dependencies. It provides a smooth and responsive zoom effect for product images, making it ideal for e-commerce websites and online galleries.

## Features

- Responsive image zooming
- Thumbnail support for multiple images
- Lazy loading of zoom images for improved performance
- Smooth animations and transitions
- Customizable options
- No jQuery dependency - pure JavaScript

## Installation

You can include Modernized EasyZoom in your project using one of the following methods:

### 1. Direct download

Download the `modernized-easyzoom.js` and `modernized-easyzoom.css` files from this repository and include them in your HTML:

```html
<link rel="stylesheet" href="path/to/modernized-easyzoom.css">
<script type="module" src="path/to/modernized-easyzoom.js"></script>
```

### 2. npm

```bash
npm install modernized-easyzoom
```

Then import it in your JavaScript:

```javascript
import EasyZoom from 'modernized-easyzoom';
```

## Usage

Here's a basic example of how to use Modernized EasyZoom:

```html
<div class="easyzoom easyzoom--overlay">
    <a href="https://source.unsplash.com/1600x900/?nature">
        <img src="https://source.unsplash.com/400x300/?nature" alt="Nature" />
    </a>
</div>

<script type="module">
    import EasyZoom from './path/to/modernized-easyzoom.js';

    document.addEventListener('DOMContentLoaded', () => {
        const easyZoomElement = document.querySelector('.easyzoom');
        const easyZoom = new EasyZoom(easyZoomElement);
    });
</script>
```

## Examples

### Basic Zoom

Here's a simple example using a nature image from Unsplash:

```html
<div class="easyzoom easyzoom--overlay">
    <a href="https://source.unsplash.com/1600x900/?nature">
        <img src="https://source.unsplash.com/400x300/?nature" alt="Nature" />
    </a>
</div>
```

### With Thumbnails

Here's an example using multiple product images with thumbnails:

```html
<div class="easyzoom easyzoom--overlay easyzoom--with-thumbnails">
    <a href="https://source.unsplash.com/1600x900/?product">
        <img src="https://source.unsplash.com/400x300/?product" alt="Product" />
    </a>
</div>

<div class="thumbnails">
    <a href="https://source.unsplash.com/1600x900/?product" data-standard="https://source.unsplash.com/400x300/?product">
        <img src="https://source.unsplash.com/60x60/?product" alt="Product Thumbnail" />
    </a>
    <a href="https://source.unsplash.com/1600x900/?product,angle" data-standard="https://source.unsplash.com/400x300/?product,angle">
        <img src="https://source.unsplash.com/60x60/?product,angle" alt="Product Angle Thumbnail" />
    </a>
    <a href="https://source.unsplash.com/1600x900/?product,detail" data-standard="https://source.unsplash.com/400x300/?product,detail">
        <img src="https://source.unsplash.com/60x60/?product,detail" alt="Product Detail Thumbnail" />
    </a>
</div>

<script type="module">
    import EasyZoom from './path/to/modernized-easyzoom.js';

    document.addEventListener('DOMContentLoaded', () => {
        const easyZoomElement = document.querySelector('.easyzoom--with-thumbnails');
        const easyZoom = new EasyZoom(easyZoomElement);

        const thumbnails = document.querySelector('.thumbnails');
        if (thumbnails) {
            thumbnails.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.closest('a');
                if (target) {
                    easyZoom.swap(target.getAttribute('data-standard'), target.getAttribute('href'));
                }
            });
        }
    });
</script>
```

## Options

You can customize Modernized EasyZoom by passing an options object when initializing:

```javascript
const easyZoom = new EasyZoom(element, {
    loadingNotice: 'Loading image',
    errorNotice: 'The image could not be loaded',
    errorDuration: 2500,
    linkAttribute: 'href',
    preventClicks: true,
    onShow: () => console.log('Zoom shown'),
    onHide: () => console.log('Zoom hidden'),
    onMove: (x, y) => console.log('Zoom moved', x, y)
});
```

## Browser Support

Modernized EasyZoom works in all modern browsers that support ES6+ JavaScript.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgements

- Inspired by the original [EasyZoom jQuery plugin](https://github.com/i-like-robots/EasyZoom)
- Modernized and rewritten in pure JavaScript
- Example images provided by [Unsplash](https://unsplash.com)

