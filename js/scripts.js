$(function () {
  if ($('#homeNavbar').length > 0 ) {
    manageNavPosition();

    $(window).on('scroll resize', function () {
      manageNavPosition();
    });
  }

  for (const item of ['appetizers', 'salads', 'burgers', 'chicken', 'steaks']) {
    generateMenuTemplate(`#${item}`);
  }

  $('#menuModal').on('show.bs.modal', function (event) {
    const element = $(event.relatedTarget);
    const headerText = element.find('.menu-header-text').text();
    const img = element.find('.menu-thumbnail').attr('src')
    const text = element.find('.menu-hidden-text').text();
    const price = element.find('.price').text();

    $('#menuModalHeader').html(menuHeaderTemplate(img));
    $('#menuModalBody').html(menuBodyTemplate(headerText, text, priceTemplate(price)));
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

const menuBodyTemplate = (headerText, text, price) => `
  <div>
    <h3>${headerText}</h3>
    <p>${text}</p>
    <br/><br/><br/>
    <div>
      ${price}
    </div>
    <br/>
    <button type="button" class="btn btn-dark btn-lg btn-block">
      <i class="fa fa-shopping-cart"></i> <strong>ADD TO CART</strong>
    </button>
  </div>
`;

const menuHeaderTemplate = img => `
  <img src="${img}" />
  <button type="button" class="close" data-dismiss="modal">&times;</button>
`;

// btn-size was on this, is it still needed?
const menuItemOddTemplate = (img, item, desc, price) => `
  <div class="col-sm-12 col-lg-6 mb-4">
    <button class="btn-secondary p-0" data-toggle="modal" data-target="#menuModal">
      <div class="media">
        <div class="media-body align-self-center ml-3">
          <h5 class="menu-header-text">${item}</h5>
          <p>${desc.slice(0, 70)}...</p>
          <p class="price">${price}</p>
          <p hidden class="menu-hidden-text">${desc}</p>
        </div>
        <img class="d-flex menu-thumbnail" src="${img}" alt="${item}" />
      </div>
    </button>
  </div>
`;

const menuItemEvenTemplate = (img, item, desc, price) => `
  <div class="col-sm-12 col-lg-6 mb-4">
    <button class="btn-secondary p-0" data-toggle="modal" data-target="#menuModal">
      <div class="media">
        <img class="d-flex mr-2 menu-thumbnail" src="${img}" alt="${item}" />
        <div class="media-body align-self-center">
          <h5 class="menu-header-text">${item}</h5>
          <p>${desc.slice(0, 70)}...</p>
          <p class="price">${price}</p>
          <p hidden class="menu-hidden-text">${desc}</p>
        </div>
      </div>
    </button>
  </div>
`;

const priceTemplate = price => {
  if (price.includes('/')) {
    const prices = price.split(" / ");

    let priceTemplate = '';
    for (const p of prices) {
      priceTemplate += `<input type="radio" name="test" value="${p}"> ${p}<br/>`
    }

    return priceTemplate;
  }

  return `<p>Price: ${price}</p>`
}

const generateMenuTemplate = elem => {
  let list;
  switch(elem) {
    case '#salads':
      list = saladItems;
      break;
    case '#appetizers':
      list = appetizerItems;
      break;
    case '#burgers':
      list = burgerItems;
      break;
    case '#chicken':
      list = chickenItems;
      break;
    case '#steaks':
      list = steakItems;
      break;
    default:
      list = []
  }

  for (const item in list) {
    const img = list[item].img;
    const name = list[item].item;
    const desc = list[item].desc;
    const price = list[item].price;

    if (item % 2 === 0) {
      $(elem).after(menuItemEvenTemplate(img, name, desc, price));
    } else {
      $(elem).after(menuItemOddTemplate(img, name, desc, price));
    }   
  }
}

const appetizerItems = [{
  item: 'Ribs and Fries',
  desc: 'Basket of our famous fall-off-the-bone ribs, smothered in our special BBQ sauce.',
  price: '$10.99',
  img: 'img/ribs-and-fries.jpg'
}, {
  item: 'Tater Skins',
  desc: 'Smothered with a heaping serving of cheddar cheese, bacon, and sour cream.',
  price: '$7.99',
  img: 'img/tater-skins.jpg'
}, {
  item: 'Fried Pickles',
  desc: 'Hand-battered, golden-fried and served with Ranch or Cajun Horseradish sauce for dipping.',
  price: '$5.99',
  img: 'img/fried-pickles.jpg'
}, {
  item: 'Cheese Fries',
  desc: 'Large serving of golden brown steak fries topped with melted cheddar cheese and bacon.',
  price: '$8.99',
  img: 'img/cheese-fries.jpg'
}];

const burgerItems = [{
  item: 'BBQ Chicken Sandwich',
  desc: 'Marinated, grilled, and basted with BBQ sauce. Served with lettuce, tomato, and onion on large buns with steak fries on the side.',
  price: '$10.99',
  img: 'img/bbq-chicken-sandwich.jpg'
}, {
  item: 'Pulled Pork',
  desc: 'Tender, slow-cooked pork covered in our signature BBQ sauce and served on a large toasted bun with steak fries on the side.',
  price: '$10.49',
  img: 'img/pulled-pork-sandwich.jpg'
}, {
  item: 'Mushroom Jack Chicken Sandwich',
  desc: 'Grilled chicken breast, sautéed mushrooms and melted jack cheese with lettuce, tomato, and onion. Served on a large toasted bun with steak fries on the side.',
  price: '$11.49',
  img: 'img/mushroom-jack-chicken-sandwich.jpg'
}, {
  item: 'All-American Cheesebuger',
  desc: 'Our classic burger made from a 1/2 lb. of fresh ground chuck, topped with American cheese and served on a large toasted bun with lettuce, tomato, and onion, along with steak fries on the side.',
  price: '$10.49',
  img: 'img/all-american-cheeseburger.jpg'
}, {
  item: 'Bacon Cheesebuger',
  desc: '1/2 lb. of fresh ground chuck, topped with bacon strips and American cheese. Served on a large toasted bun with lettuce, tomato, and onion, and served with steak fries on the side.',
  price: '$10.99',
  img: 'img/bacon-cheeseburger.jpg'
}, {
  item: 'Smokehouse Burger',
  desc: '1/2 lb. of fresh ground chuck, topped with sautéed mushrooms, onions, and BBQ sauce over American and jack cheeses; served on a large toasted bun with lettuce, tomato, onion, and steak fries on the side.',
  price: '$10.49',
  img: 'img/smokehouse-burger.jpg'
}];

const chickenItems = [{
  item: 'Portobello Mushroom Chicken',
  desc: 'Grilled, marinated chicken breast with Portobello Mushroom sauce, jack and Parmesan cheese, and served with your choice of two sides.',
  price: '$14.99',
  img: 'img/grilled-salmon.jpg'
}, {
  item: 'Smothered Chicken',
  desc: 'Grilled, marinated chicken breast with sautéed onions and mushrooms, and cream gravy or jack cheese. Served with your choice of two sides.',
  price: '$14.49',
  img: 'img/smothered-chicken.jpg'
}, {
  item: 'Grilled BBQ Chicken',
  desc: 'Marinated 1⁄2 lb. Chicken breast basted in BBQ sauce and served with your choice of two sides.',
  price: '$12.99',
  img: 'img/grilled-bbq-chicken.jpg'
}, {
  item: 'Herb Crusted Chicken',
  desc: 'Boneless, marinated chicken breast seasoned with a blend of herbs and spices, then seared and served with a caramelized lemon for extra flavor. Served with your choice of two sides.',
  price: '$13.99',
  img: 'img/herb-crusted-chicken.jpg'
}, {
  item: 'Grilled Shrimp',
  desc: 'Jumbo shrimp seasoned, grilled, drizzled with garlic lemon pepper butter and served over seasoned rice. Served with your choice of two sides.',
  price: '$17.99',
  img: 'img/grilled-shrimp.jpg'
}, {
  item: 'Grilled Salmon',
  desc: '8 oz. salmon steak, grilled moist and tender, topped with lemon pepper butter. Served with your choice of two sides.',
  price: '$14.99',
  img: 'img/grilled-salmon.jpg'
}];

const saladItems = [{
  item: 'Ceasar Salad',
  desc: 'Fresh hearts of romaine, Parmesan cheese, and made-from-scratch croutons tossed with delicious Caesar dressing.',
  price: '$4.99',
  img: 'img/caesar-salad.jpg'
}, {
  item: 'Chicken Caesar Salad',
  desc: 'Tender strips of grilled chicken tossed with crisp hearts of romaine, fresh Parmesan cheese, made-from-scratch croutons, and zesty Caesar dressing.',
  price: '$11.99',
  img: 'img/chicken-caesar-salad.jpg'
}, {
  item: 'Grilled Chicken Salad',
  desc: 'Crisp cold greens, strips of marinated chicken, jack cheese, egg, tomato, bacon, red onions, and croutons, served with your choice of made-from-scratch dressing: Ranch Low-Fat Ranch Honey Mustard Thousand Island Italian Bleu Cheese.',
  price: '$11.99',
  img: 'img/grilled-chicken-salad.jpg'
}, {
  item: 'House Salad',
  desc: 'Fresh greens, cheddar cheese, tomato, eggs, and made-from-scratch croutons, served with your choice of made-from-scratch dressing: Ranch Low-Fat Ranch Honey Mustard Thousand Island Italian Bleu Cheese.',
  price: '$4.99',
  img: 'img/house-salad.jpg'
}];

const steakItems = [{
  item: 'Ribeye',
  desc: 'Very juicy and flavorful due to the marbling throughout the steak and served with your choice of two sides. 10 oz. / 12 oz. / 16 oz. portions.',
  price: '$22.99 / $25.99',
  img: 'img/ribeye.jpg'
}, {
  item: 'Filet Mignon',
  desc: 'Our most tender steak, lean and melts in your mouth, and served with your choice of two sides. 6 oz or 8 oz portions.',
  price: '$20.99 / $24.99',
  img: 'img/filet.jpg'
}, {
  item: 'USDA Choice Sirloin',
  desc: 'A crowd favorite. Hearty, flavorful, and a great value. Served with your choice of two sides. 6 oz. / 8 oz. / 11 oz. / 16 oz. portions.',
  price: '$13.99 / $16.49 / $20.49 / $24.99',
  img: 'img/sirloin.jpg'
}, {
  item: 'New York Strip',
  desc: 'This generous 12 oz. cut is aged longer for extra tenderness and flavor. Served with your choice of two sides.',
  price: '$21.99',
  img: 'img/new-york-strip.jpg'
}, {
  item: 'Bone-In Ribeye',
  desc: '20 oz. cut of our juicy, flavorful ribeye served on the bone for extra flavor. Served with your choice of two sides.',
  price: '$29.99',
  img: 'img/bone-in-ribeye.jpg'
}, {
  item: 'Porterhouse T-Bone',
  desc: 'Filet and New York Strip come together for one large 23 oz. USDA Choice steak. Served with your choice of two sides.',
  price: '$30.99',
  img: 'img/porterhouse-tbone.jpg'
}, {
  item: 'Prime Rib',
  desc: 'Our flavorful ribeye steak slow-cooked to perfection. Served with your choice of two sides. 10 oz. / 12 oz. / 16 oz. portions.',
  price: '$20.99 / $22.99 / $25.99',
  img: 'img/prime-rib.jpg'
}, {
  item: 'Ribs',
  desc: 'Our ribs are slow-cooked with a unique blend of seasonings and BBQ sauce. Served with your choice of two sides. Half Slab or Full Slab.',
  price: '$16.99 / $22.99',
  multi: true,
  img: 'img/ribs.jpg'
}];
