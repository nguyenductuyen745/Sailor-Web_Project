 
  // Lỗi có Bug thì kiểm tran biến keyword(có thể nó có problem)

 function portfolioController() {
  var controllerElement = document.querySelector('.portfolio-controller');
  var controllerItemElements = controllerElement.querySelectorAll('.portfolio-controller__item');
  var portfolioItems = document.querySelectorAll('div[data-id]');
  var cartElements = document.querySelector('.tab-content__pane--group');
  var keyword;
  var lastKeyword;


  function delay(item) {
    setTimeout(function() {
      item.style.display = "none";
    }, 399);
  }

  // Chuyển màu control và thay đổi content
  controllerElement.addEventListener('click', function(event) {
      // Thực hiện tạo css cho nút vừa được click
      var currentElement = event.target;
      currentElement.classList.add('active'); 
      keyword = event.target.dataset['keyword'];

      if(currentElement.matches('.portfolio-controller__item') && keyword != lastKeyword) {
        
        for(var element of controllerItemElements) {
          if(!(element === currentElement)) {
            element.classList.remove('active');
          }
        }

        // Xóa hết class và ẩn các img đi để hiệu ứng animation được áp dụng nên tất cả đt
        for(var i of portfolioItems) {
          i.classList.remove('scale-Up');
          i.classList.add('scale-Down');
          // i.style.display = "none";
          // delay(i);
        }

        setTimeout(function() {
          for(var item of portfolioItems) {
            if(item.dataset['id'] == keyword || keyword === 'ALL') {
              item.classList.add('scale-Up');
              item.style.display = "block";
            } else {
              item.classList.remove('scale-Up');
              item.style.display = "none";
            }
            item.classList.remove('scale-Down');
          }
        }, 380);
      }
      // Để đảm bảo rằng animation sẽ ko bị lặp lại khi user nhấn liên tục vào chỉ 1 nút
      lastKeyword = keyword;
  });

  function cartScale(x) {
    if(x.matches) {
      for(var item of cartElements.querySelectorAll('div[data-id]')) {
        if(keyword === "CARD") {
          item.classList.add('fifty-percent');
        } else {
          item.classList.remove('fifty-percent');
        }
      }
    } else {
      for(var item of cartElements.querySelectorAll('div[data-id]')) {
        item.classList.remove('fifty-percent');
      }
    }

  }

  var x = window.matchMedia("(max-width: 992px)");
  cartScale(x);
  x.addListener(cartScale);

  // Thay đổi nội dung của phần card khi vào kích thước nhỏ hơn
  controllerElement.addEventListener('click', function(event) {
    var currentElement = event.target;
    cartScale(x);

    setTimeout(function() {
      if(keyword === "CARD") {
        cartElements.style.display = "flex";
        Object.assign(cartElements.style, {
          flexDirection: "row",
          width: "100%"
        });
  
      } else {
        cartElements.removeAttribute('style');
        keyword === "ALL" ? cartElements.style.display = "flex" : cartElements.style.display = "none";
      }
    }, 300);
  });

}

function scrollAction() {
  var headerElement = document.querySelector('.header');
  var backTopElement = document.querySelector('.back-to-top');

  // Thay đổi kích thước header
  window.addEventListener('scroll', function(event) {
    var currentTop = document.documentElement.scrollTop;
    if(currentTop >= 105) {
      headerElement.classList.add('scrolling');
      backTopElement.classList.add('visible-btn-back');
    } else {
      headerElement.classList.remove('scrolling');
      backTopElement.classList.remove('visible-btn-back');
    }
  })

  // Bắt sự kiện cho back-to-top
  backTopElement.addEventListener('click', function(event) {
    document.documentElement.scrollTop = 0;
  })
}

  // Phần này là code mẫu để action khi user kéo k/t màn
 /* function portfoliaSacle(x) {
      var imgNumberFive = document.querySelector('div[data-id="five"]');
      var imgNumberSeven = document.querySelector('div[data-id="seven"]');
      var tamHeight = imgNumberFive.style.height;
      var tamSrc = imgNumberFive.querySelector('img').src;
    if (x.matches) { // If media query matches
      imgNumberFive.style.height = imgNumberSeven.style.height;
      imgNumberSeven.style.height = tamHeight;
      imgNumberFive.querySelector('img').src = imgNumberSeven.querySelector('img').src;
      imgNumberSeven.querySelector('img').src = tamSrc;
    }
  }
  
  var x = window.matchMedia("(max-width: 992px)");
  portfoliaSacle(x); // Call listener function at run time
  x.addListener(portfoliaSacle); // Attach listener function on state changes*/