/*
 * Initializes jQuery plugins on elements which have data-plugin="..." HTML
 * attribute.
 *
 * When plugin is being destroyed first parameter will be passed 'destroy'
 *
 * @example
 *     <div data-plugin="examplePlugin" data-xxx="123"></div>
 *
 * @example
 *     $.fn.examplePlugin = function (data) {
 *         if (data === 'destroy') {
 *             // Destroy plugin
 *             // ...
 *         } else {
 *             // Initialize plugin
 *             console.log(this, data.xxx);
 *         }
 *     };
 */

import $, { error } from 'jquery';
import { initPlugins, destroyPlugins } from './lib/plugins';

// Example plugin
import './components/example';

import './components/fade';
import './components/submitter';
import './components/textJumper';

const faders = [
  // add any components that need to fade in/out here
];

$(() => {
  for (let i = 0; i < faders.length; i++) {
    const fader = faders[i];
    fader.fadeInOut();

    fader.on('mouseenter', fader.fadeIn);
    fader.on('mouseleave', fader.fadeOut);
  }
});

$(() => {
  const lazyImages = $("img.lazyload");

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          var lazyImage = $(entry.target);
          lazyImage.attr("src", lazyImage.data("src"));
          lazyImage.attr("srcset", lazyImage.data("srcset"));
          lazyImage.removeClass("lazyload");
          lazyImageObserver.unobserve(entry.target);
        }
      });
    });

    lazyImages.each(function() {
      lazyImageObserver.observe(this);
    });
  } else {
    // Fallback for browsers that do not support Intersection Observer
    lazyImages.each(function() {
      const lazyImage = $(this);
      lazyImage.attr("src", lazyImage.data("src"));
      lazyImage.attr("srcset", lazyImage.data("srcset"));
    });
  }
});

$(() => {
    initPlugins();

    /*
     * @TODO Uncomment to check whether with multiple destroy / init calls
     * it still works correctly
     * For memory leaks we will check manually
     */
    // destroyPlugins();
    // initPlugins();
    // destroyPlugins();
    // initPlugins();
});