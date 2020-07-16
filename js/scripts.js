$(function () {
  manageNavPosition();

  $(window).on('scroll resize', function () {
    manageNavPosition();
  });
});

// sets at what pixels to move the navbar from the bottom to fixed-top or sticky-top
const manageNavPosition = () => {
  const screenWidth = window.innerWidth;
  const scrollPx = 200;
  const width = 769;
  
  if (screenWidth < width) {
    if ($('#navbar').hasClass('fixed-bottom')) {
      $('#navbar').removeClass('fixed-bottom');
      $('#navbar').addClass('sticky-top');
    }
  } else if (document.documentElement.scrollTop > scrollPx) {
    if ($('#navbar').hasClass('fixed-bottom')) {
      $('#navbar').removeClass('fixed-bottom');
      $('#navbar').addClass('fixed-top');
    }
  } else {
      $('#navbar').removeClass('fixed-top');
      $('#navbar').removeClass('sticky-top');
      $('#navbar').addClass('fixed-bottom');
  } 
}