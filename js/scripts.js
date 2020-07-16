$(function () {
  if ($('#homeNavbar')) {
    manageNavPosition();

    $(window).on('scroll resize', function () {
      manageNavPosition();
    });
  }
});

// sets at what pixels to move the navbar from the bottom to fixed-top or sticky-top
const manageNavPosition = () => {
  const screenWidth = window.innerWidth;
  const scrollPx = 200;
  const width = 769;
  
  if (screenWidth < width) {
    if ($('#homeNavbar').hasClass('fixed-bottom')) {
      $('#homeNavbar').removeClass('fixed-bottom');
      $('#homeNavbar').addClass('sticky-top');
    }
  } else if (document.documentElement.scrollTop > scrollPx) {
    if ($('#homeNavbar').hasClass('fixed-bottom')) {
      $('#homeNavbar').removeClass('fixed-bottom');
      $('#homeNavbar').addClass('fixed-top');
    }
  } else {
      $('#homeNavbar').removeClass('fixed-top');
      $('#homeNavbar').removeClass('sticky-top');
      $('#homeNavbar').addClass('fixed-bottom');
  } 
}