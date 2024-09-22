// EasyZoom.js
export default class EasyZoom {
  constructor(target, options = {}) {
    this.target = target;
    this.opts = { ...EasyZoom.defaults, ...options, ...this.getDataOptions() };
    this._init();
  }

  static defaults = {
    loadingNotice: "Loading image",
    errorNotice: "The image could not be loaded",
    errorDuration: 2500,
    linkAttribute: "href",
    preventClicks: true,
    onShow: () => {},
    onHide: () => {},
    onMove: () => {},
  };

  getDataOptions() {
    const dataset = this.target.dataset;
    const options = {};
    for (const [key, value] of Object.entries(dataset)) {
      options[key] =
        value === "true" ? true : value === "false" ? false : value;
    }
    return options;
  }

  _init() {
    this.isOpen = false;
    this.isReady = false;

    this.link = this.target.querySelector("a");
    this.image = this.target.querySelector("img");

    this.flyout = document.createElement("div");
    this.flyout.className = "easyzoom-flyout";

    this.target.style.position = "relative";
    this.target.appendChild(this.flyout);

    this.target.addEventListener("mouseenter", this._onEnter.bind(this));
    this.target.addEventListener("mousemove", this._onMove.bind(this));
    this.target.addEventListener("mouseleave", this._onLeave.bind(this));

    // Add touch event listeners
    this.target.addEventListener("touchstart", this._onEnter.bind(this));
    this.target.addEventListener("touchmove", this._onMove.bind(this));
    this.target.addEventListener("touchend", this._onLeave.bind(this));

    // Prevent default link behavior
    this.link.addEventListener("click", (e) => {
      e.preventDefault();
    });

    this._loadZoomImage();
  }

  _loadZoomImage() {
    this.zoomImg = new Image();
    this.zoomImg.src = this.link.getAttribute(this.opts.linkAttribute);
    this.zoomImg.onload = () => {
      this.isReady = true;
      this.flyout.appendChild(this.zoomImg);
      this.zoomImg.style.position = "absolute";
    };
  }

  _onEnter(e) {
    e.preventDefault();
    if (!this.isReady) return;
    this.isOpen = true;
    this.target.classList.add("is-active");
    this._move(e);
  }

  _onMove(e) {
    e.preventDefault();
    if (!this.isOpen || !this.isReady) return;
    this._move(e);
  }

  _onLeave(e) {
    this.isOpen = false;
    this.target.classList.remove("is-active");
  }

  _move(e) {
    let pointerX, pointerY;

    if (e.type.startsWith("touch")) {
      const touch = e.touches[0] || e.changedTouches[0];
      pointerX = touch.clientX;
      pointerY = touch.clientY;
    } else {
      pointerX = e.clientX;
      pointerY = e.clientY;
    }

    const targetRect = this.target.getBoundingClientRect();
    const relativePositionX = (pointerX - targetRect.left) / targetRect.width;
    const relativePositionY = (pointerY - targetRect.top) / targetRect.height;

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

  teardown() {
    this.target.removeEventListener("mouseenter", this._onEnter);
    this.target.removeEventListener("mousemove", this._onMove);
    this.target.removeEventListener("mouseleave", this._onLeave);
    this.target.removeEventListener("touchstart", this._onEnter);
    this.target.removeEventListener("touchmove", this._onMove);
    this.target.removeEventListener("touchend", this._onLeave);
    this.flyout.remove();
  }

  swap(standardSrc, zoomHref) {
    this.isReady = false;

    // Update the standard image
    this.image.src = standardSrc;

    // Update the zoom link
    this.link.setAttribute(this.opts.linkAttribute, zoomHref);

    // Load the new zoom image
    const newZoomImg = new Image();
    newZoomImg.src = zoomHref;
    newZoomImg.onload = () => {
      this.zoomImg = newZoomImg;
      this.zoomImg.style.position = "absolute";

      // Clear the flyout and add the new image
      this.flyout.innerHTML = "";
      this.flyout.appendChild(this.zoomImg);

      this.isReady = true;
    };
  }
}
