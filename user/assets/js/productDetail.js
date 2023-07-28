document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const url = 'http://localhost:2000/inters';
  const cartUrl = 'http://localhost:2000/cart';
  if (productId) {
    fetchDataById(productId);
  } else {
    console.error("No ID provided in the URL.");
  }

  const productDetailInfo = document.querySelector(".product-detail-info");
  const infoTopBody = productDetailInfo.querySelector(".info-top-body");
  const infoPriceOld = productDetailInfo.querySelector(".info-price-old");
  const infoPriceNew = productDetailInfo.querySelector(".info-price-new");
  const infoDownDesc = productDetailInfo.querySelector(".info-down-desc");
  const infoTopHeaderView = productDetailInfo.querySelector(".info-top-header-view");
  const infoTopHeaderViewReview = document.querySelector(".info-top-header-view-review");
  const infoTopBodyReview = document.querySelector(".info-top-body-review");
  const infoPriceOldReview = document.querySelector(".info-price-old-review");
  const infoPriceNewReview = document.querySelector(".info-price-new-review");
  const infoDownDescReview = document.querySelector(".info-down-desc-review");
  
  function fetchDataById(productId) {
    fetch(`${url}/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        const { name, desc, priceOld, priceNew, quantity, image } = product;

        // Update the HTML elements with the fetched data
        infoTopBody.textContent = name;
        infoDownDesc.textContent = desc;
        infoPriceOld.textContent = `$`+priceOld;
        infoPriceNew.textContent = `$`+priceNew;
        infoTopHeaderView.textContent = quantity;
        infoTopHeaderViewReview.textContent = quantity;
        infoTopBodyReview.textContent = name;
        infoPriceOldReview.textContent = `$`+priceOld;
        infoPriceNewReview.textContent = `$`+priceNew;
        infoDownDescReview.textContent = desc;

        if(priceOld === ''){
          infoPriceOld.style.display = 'none';
          infoPriceOldReview.style.display = 'none';
        }
        else{
          infoPriceOld.style.display = 'block';
          infoPriceOldReview.style.display = 'block';
        }

        // Set the image URL as the background for the detail-img-left div
        const detailImgLeftBack = document.querySelector(".detail-img-left");
        const detailImgRightMain = document.querySelector(".right-image-side-main");
        detailImgLeftBack.style.backgroundImage = `url(${image})`;
        detailImgRightMain.style.backgroundImage = `url(${image})`;

        const imageCasrt = image;

        // Add click event to the "Buy Link Click" button

        const buyClickButton = document.querySelector(".buy-click");
        const buyNowButton = document.querySelector(".buy-now");
        const buyClickButtonReview = document.querySelector(".buy-click-review");
        const buyNowButtonReview = document.querySelector(".buy-now-review");
        buyClickButton.addEventListener("click", () => {
          const dataToSave = {
            name: infoTopBody.textContent,
            quantity: infoTopHeaderView.textContent,
            image: imageCasrt,
            priceNew: infoPriceNew.textContent.replace('$', ''), // Remove the dollar sign from the price
            number:1
          };
          // Save the data to the cart using a POST request
          fetch(cartUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log("Product added to the cart:", responseData);
          })
          .catch((error) => {
            console.error("Error saving data to cart:", error);
          });
          window.location.href = "cart.html";
        });
        buyClickButtonReview.addEventListener("click", () => {
          const dataToSave = {
            name: infoTopBody.textContent,
            quantity: infoTopHeaderView.textContent,
            image: imageCasrt,
            priceNew: infoPriceNew.textContent.replace('$', ''), // Remove the dollar sign from the price
            number:1
          };
          // Save the data to the cart using a POST request
          fetch(cartUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log("Product added to the cart:", responseData);
          })
          .catch((error) => {
            console.error("Error saving data to cart:", error);
          });
          window.location.href = "cart.html";
        })

        buyNowButton.addEventListener("click", () =>{
          window.location.href = "checkoutContact.html";
        })
        buyNowButtonReview.addEventListener("click", () =>{
          window.location.href = "checkoutContact.html";
        })
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      
  }

  const detailImgLeft = document.querySelector(".detail-img-left");
  const rightImageSides = document.querySelectorAll(".right-image-side");

  // Lặp qua các ảnh nhỏ và thêm sự kiện click
  rightImageSides.forEach((rightImageSide) => {
    rightImageSide.addEventListener("click", () => {
      const newBackgroundImage = rightImageSide.style.backgroundImage;
      detailImgLeft.style.backgroundImage = newBackgroundImage;
    });
  });
});


function goToHome(){
  window.location.href = "index.html";
}


/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});