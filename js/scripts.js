$(function () {
  if ($('#homeNavbar').length != 0 ) {
    manageNavPosition();

    $(window).on('scroll resize', function () {
      manageNavPosition();
    });
  }

  $('#menuModal').on('show.bs.modal', function (event) {
    const element = $(event.relatedTarget);
    const headerText = element.find('.menu-header-text').text();
    const img = element.find('.menu-thumbnail').attr('src')
    const text = element.find('.menu-text').text();
    $('#menuModalHeader').html(menuHeaderTemplate(img));
    $("#menuModalBody").html(menuBodyTemplate(headerText, text));
  });
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

const menuBodyTemplate = (headerText, text) => `
  <div>
    <h3>${headerText}</h3>
    <p>${text}</p>
    <br/><br/><br/>
    <button type="button" class="btn btn-dark btn-lg btn-block">
      <i class="fa fa-shopping-cart"></i> <strong>ADD TO CART</strong>
    </button>
  </div>
`;

const menuHeaderTemplate = (img) => `
  <img src="${img}" />
  <button type="button" class="close" data-dismiss="modal">&times;</button>
`;