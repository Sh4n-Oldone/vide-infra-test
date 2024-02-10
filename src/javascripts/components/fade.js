import $ from 'jquery';

$.fn.fadeInOut = function() {
  const $element = this;

  function fadeIn() {
    $element.removeClass('fade-out-text');
    $element.addClass('fade-in-text');
  }

  function fadeOut() {
    $element.removeClass('fade-in-text');
    $element.addClass('fade-out-text');
  }

  // Call the appropriate function based on the animation type
  this.fadeIn = fadeIn;
  this.fadeOut = fadeOut;

  return this;
};