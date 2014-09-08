(function(define){'use strict';define(function(require,exports,module){
/*globals define*//*jshint node:true*/

/**
 * Dependencies
 */

var utils = require('gaia-component-utils');

/**
 * Locals
 */

var packagesBaseUrl = window.packagesBaseUrl || '/bower_components/';
var baseUrl = window.GaiaNotificationBaseUrl || packagesBaseUrl + 'gaia-notification/';

var stylesheets = [
  { url: packagesBaseUrl + 'gaia-icons/style-embedded.css' },
  { url: baseUrl + 'style.css', scoped: true }
];

// Extend from the HTMLElement prototype
var proto = Object.create(HTMLElement.prototype);

/**
 * Attributes supported
 * by this component.
 *
 * @type {Object}
 */
proto.attrs = {
  dismissable: true
};

/**
 * Runs when an instance of the
 * element is first created.
 *
 * When use this moment to create the
 * shadow-dom, inject our template
 * content, setup event listeners
 * and set the draw state to match
 * the initial `open` attribute.
 *
 * @private
 */
proto.createdCallback = function() {
  var tmpl = template.content.cloneNode(true);
  var shadow = this.createShadowRoot();

  this.inner = tmpl.firstElementChild;
  
  // Setup initial attributes
  this.dismissable = this.getAttribute('dismissable');
  if (this.dismissable != null) { 
    this.inner.setAttribute('dismissable', this.dismissable);
  }
  
  shadow.appendChild(tmpl);
  utils.style.call(this, stylesheets);
};

// HACK: Create a <template> in memory at runtime.
// When the custom-element is created we clone
// this template and inject into the shadow-root.
// Prior to this we would have had to copy/paste
// the template into the <head> of every app that
// wanted to use <gaia-switch>, this would make
// markup changes complicated, and could lead to
// things getting out of sync. This is a short-term
// hack until we can import entire custom-elements
// using HTML Imports (bug 877072).
var template = document.createElement('template');
template.innerHTML = '<span>' +
        '<content></content>' + 
				'<div class="close" data-icon="close"></div>' +
			'</span>';

// Register and return the constructor
module.exports = document.registerElement('gaia-notification', { prototype: proto });

});})((function(n,w){'use strict';return typeof define=='function'&&define.amd?
define:typeof module=='object'?function(c){c(require,exports,module);}:
function(c){var m={exports:{}},r=function(n){return w[n];};
w[n]=c(r,m.exports,m)||m.exports;};})('gaia-notification',this));
