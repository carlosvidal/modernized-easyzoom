// Modernized EasyZoom.js
export default class EasyZoom {
  constructor(target, options = {}) {
    this.target = target;
    // Merge default options, provided options, and data attributes
    this.opts = { ...EasyZoom.defaults, ...options, ...this.getDataOptions() };
    this._init();
  }

  // Default options
  static defaults = {
    loadingNotice: "Loading image",
    errorNotice: "The image could not be loaded",
    errorDuration: 2500,
    linkAttribute: "href",
    preventClicks: true,
    beforeShow: () => {},
    beforeHide: () => {},
    onShow: () => {},
    onHide: () => {},
    onMove: () => {},
  };

  // Extract options from data attributes
  getDataOptions() {
    const dataset = this.target.dataset;
    const options = {};
    for (const [key, value] of Object.entries(dataset)) {
      options[key] =
        value === "true" ? true : value === "false" ? false : value;
    }
    return options;
  }

  // Initialize the EasyZoom functionality
  _init() {
    this.isOpen = false;
    this.isReady = false;

    this.link = this.target.querySelector("a");
    this.image = this.target.querySelector("img");

    // Create the flyout element
    this.flyout = document.createElement("div");
    this.flyout.className = "easyzoom-flyout";

    this.target.style.position = "relative";
    this.target.appendChild(this.flyout);

    // Add event listeners
    this.target.addEventListener("mouseenter", this._onEnter.bind(this));
    this.target.addEventListener("mousemove", this._onMove.bind(this));
    this.target.addEventListener("mouseleave", this._onLeave.bind(this));

    // We don't load the zoom image immediately (lazy loading)
  }

  // Handler for mouse enter event
  _onEnter(e) {
    if (!this.isReady) {
      // Load the zoom image only when the user enters for the first time
      this._loadZoomImage(() => {
        this.isOpen = true;
        this.target.classList.add("is-active");
        this._move(e);
      });
    } else {
      this.isOpen = true;
      this.target.classList.add("is-active");
      this._move(e);
    }
  }

  // Load the zoom image
  _loadZoomImage(callback) {
    if (this.isReady) {
      callback();
      return;
    }

    this.zoomImg = new Image();
    this.zoomImg.src = this.link.getAttribute(this.opts.linkAttribute);
    this.zoomImg.onload = () => {
      this.isReady = true;
      this.flyout.appendChild(this.zoomImg);
      this.zoomImg.style.position = "absolute";
      callback();
    };
  }

  // Handler for mouse move event
  _onMove(e) {
    if (!this.isOpen || !this.isReady) return;
    this._move(e);
  }

  // Handler for mouse leave event
  _onLeave() {
    this.isOpen = false;
    this.target.classList.remove("is-active");
  }

  // Calculate and apply the zoom image position
  _move(e) {
    const targetRect = this.target.getBoundingClientRect();
    const relativePositionX = (e.clientX - targetRect.left) / targetRect.width;
    const relativePositionY = (e.clientY - targetRect.top) / targetRect.height;

    const moveX = -(
      (this.zoomImg.width - this.flyout.offsetWidth) *
      relativePositionX
    );
    const moveY = -(
      (this.zoomImg.height - this.flyout.offsetHeight) *
      relativePositionY
    );

    this.zoomImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    this.opts.onMove.call(this, moveX, moveY);
  }

  // Remove event listeners and clean up
  teardown() {
    this.target.removeEventListener("mouseenter", this._onEnter);
    this.target.removeEventListener("mousemove", this._onMove);
    this.target.removeEventListener("mouseleave", this._onLeave);
    this.flyout.remove();
  }

  // Swap the current image with a new one
  swap(standardSrc, zoomHref) {
    this.isReady = false;

    // Update the standard image
    this.image.src = standardSrc;

    // Update the zoom link
    this.link.setAttribute(this.opts.linkAttribute, zoomHref);

    // We don't load the new zoom image immediately
    // It will be loaded when the user hovers over it again
  }
}
