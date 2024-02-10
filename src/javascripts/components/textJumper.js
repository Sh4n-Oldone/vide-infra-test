import $ from 'jquery';

$(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add your animation class here
        $(entry.target).addClass('text-jumper');
      } else {
        $(entry.target).removeClass('text-jumper');
      }
    });
  });

  $('.content__part_text-part').each(function() {
    observer.observe(this);
  });
});