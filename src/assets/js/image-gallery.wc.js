
class ImageGallery extends HTMLElement {
	connectedCallback() {
		this.gallery = this.getAttribute('gallery') || 'gallery';

		this.loadScript('/assets/packages/fslightbox/fslightbox.js').then(() => {
			this.init();
		});
	}

	init() {
		// Find all the images and wrap them in a link
		const images = this.querySelectorAll('img');

		images.forEach((image, index) => {
			const link = document.createElement('a');
			link.href = image.src;
			link.setAttribute('data-fslightbox', this.gallery);
			link.setAttribute('data-type', `image`);
			link.appendChild(image.cloneNode(true));
			image.parentNode.replaceChild(link, image);
		});

		// Refresh FSLightbox so it can see our new links
		refreshFsLightbox();
	}

	/**
	 * Load Script
	 */
	loadScript(url) {
		return new Promise((resolve, reject) => {
			// Don't load the script if it's already loaded
			if (document.getElementById('image-gallery-fslightbox')) {
				resolve();
				return;
			}

			// Create script element and set attributes
			const script = document.createElement('script');
			script.id = 'image-gallery-fslightbox';
			script.src = url;

			// Append the script to the DOM
			const el = document.getElementsByTagName('script')[0];
			el.parentNode.insertBefore(script, el);

			// Resolve the promise once the script is loaded
			script.addEventListener('load', () => {
				resolve(script);
			});

			// Catch any errors while loading the script
			script.addEventListener('error', () => {
				reject(new Error(`${url} failed to load.`));
			});
		});
	}
}

customElements.define('image-gallery', ImageGallery);
