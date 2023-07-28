const url = 'http://localhost:2000/cart';
const productListRight = document.querySelector('.order-summary-right-product');
const subtotalPrice = document.querySelector('.subtotal-price');
let outputRight ='';
let data = [];

const fetchCartData = async () => {
  try {
    let response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      renderProduct(data);
      updateTotalPrice();
      setupDeleteButtons(); // Thêm dòng này để gắn sự kiện click trên nút xóa sau khi cập nhật giao diện sản phẩm
    } else {
      console.error('Failed to fetch cart data:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

const renderProduct = (products) =>{
  outputRight = '';
  products.forEach(product => {
      outputRight += `
        <div class="order-summary-right-product-detail">
          <div class="right-product-detail-img"
            style='background-image: url(${product.image});'>
          </div>
          <div class="right-product-detail-info">
            <div class="right-product-detail-info-quantity">${product.quantity} x</div>
            <div class="right-product-detail-info-name">${product.name}</div>
            <div class="right-product-detail-info-price">$${product.priceNew}</div>
          </div>
        </div>
      `
  });
  productListRight.innerHTML = outputRight;
  if(products!=[]){
    subtotalPrice.textContent = '$'+products[0].priceNew;
  }
  else{
    subtotalPrice.textContent = '$0.000';
  }
}

fetch(url)
    .then(res => res.json())
    .then(data=>renderProduct(data))

fetchCartData();
const setupDeleteButtons = () => {
  const deleteButtons = document.querySelectorAll('.product-detail-delete');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => handleDeleteProduct(index));
  });
};
    
const handleDeleteProduct = (index) => {
  const productToDelete = data[index];
  data.splice(index, 1);
  fetch(`${url}/${productToDelete.id}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to delete product from the server.');
    }
    return response.json();
  })
  .then(() => {
    outputLeft = '';
    outputRight = '';
    renderProduct(data);
    updateTotalPrice();
  })
  .catch((error) => {
    console.error('Error deleting product:', error);
  });
};

const increaseValue = (name, id, number, img, quantity, priceNew) => {
  number++;
  sendUpdateToServer(name, id, number, img, quantity, priceNew);
  renderProduct(data); // Cập nhật lại giao diện khi thay đổi giá trị
  updateTotalPrice();
  fetchCartData();
};

const decreaseValue = (name, id, number, img, quantity, priceNew) => {
  if (number > 1) {
    number--;
    sendUpdateToServer(name, id, number, img, quantity, priceNew);
    renderProduct(data); 
    updateTotalPrice();
    fetchCartData();
  }
};

const sendUpdateToServer = (name, id, number, img, quantity, priceNew) => {
  fetch(`${url}/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name:name,
      number: number, 
      image: img,
      quantity: quantity,
      priceNew: priceNew
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update product quantity on the server.');
      }
      return response.json();
    })
    .then((data) => {
      // Xử lý kết quả phản hồi từ máy chủ
    })
    .catch((error) => {
      console.error('Error updating product quantity:', error);
    });
};


const calculateTotalPrice = () => {
  let total = 0;
  data.forEach(product => {
    total += product.priceNew * product.number;
  });
  return total;
};

const updateTotalPrice = () => {
  const totalPriceDiv = document.querySelector('.total-price');
  const totalPrice = calculateTotalPrice();
  totalPriceDiv.textContent = `$${totalPrice.toFixed(3)}`;
};


const changeEmail = document.querySelector(".changeEmail");
const contactBody = document.querySelector(".contact-body");
const contactBtn = document.querySelector(".contact-btn-email");

changeEmail.addEventListener("click", () =>{
  changeEmail.style.display='none';
  contactBody.style.display='block';
  contactBtn.style.display='flex';
})

const changeShipping = document.querySelector(".changeShipping");
const shippingBody = document.querySelector(".shipping-body");
const contactBtnShipping = document.querySelector(".contact-btn-shipping");

changeShipping.addEventListener("click", () =>{
  changeShipping.style.display='none';
  shippingBody.style.display='inline-block';
  contactBtnShipping.style.display='flex';
})

const paymentMethod = document.querySelector(".paymentMethod");
const paymentBody = document.querySelector(".payment-body");
const paymentBtn = document.querySelector(".payment-btn");

paymentMethod.addEventListener("click", () =>{
  paymentMethod.style.display='none';
  paymentBody.style.display='inline-block';
  paymentBtn.style.display='flex';
})


const provinces = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Thanh Hóa",
  "Ninh Bình",
  "Bắc Ninh",
  "Thái Bình",
  "Hà Nam",
  "Cần Thơ",
  "Nam Định",
  "Hải Phòng",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Yên Bái"
];

const provinceSelect = document.getElementById('provinceSelect');
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  option.textContent = province;
  provinceSelect.appendChild(option);
});



// JavaScript để kiểm tra và đổi màu nút submit
function checkEmail() {
  var emailInput = document.getElementById('emailInput');
  var submitBtn = document.getElementById('submitBtn');

  // Biểu thức chính quy kiểm tra định dạng email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailInput.addEventListener('input', function () {
    if (emailPattern.test(emailInput.value)) {
        // Nếu email hợp lệ, thêm class "valid" vào nút submit
        submitBtn.classList.add("btn-valid");
    } else {
        // Nếu email không hợp lệ, thêm class "invalid" vào nút submit
        submitBtn.classList.remove("btn-valid");
    }
});
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