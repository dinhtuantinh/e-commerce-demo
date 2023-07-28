const url = 'http://localhost:2000/cart';
const productListLeft = document.querySelector('.order-product');
const productListRight = document.querySelector('.order-summary-right-product');
const subtotalPrice = document.querySelector('.subtotal-price');
let outputLeft ='';
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
  outputLeft = '';
  outputRight = '';
  products.forEach(product => {
    outputLeft += `
      <div class="product-detail">
            <div class="product-detail-image"
              style='background-image: url(${product.image});'></div>
            <div class="name-quantity">
              <div class="name-quantity-up">${product.name}</div>
              <div class="name-quantity-down">${product.quantity} x</div>
            </div>
            <div class="product-detail-price">$${product.priceNew}</div>
            <div class="product-detail-number">
              <button class="number-decrease" onclick="decreaseValue('${product.name}', ${product.id}, ${product.number}, '${product.image}', '${product.quantity}', '${product.priceNew}')">
                <div class="increase"></div>
              </button>
              <div class="number-input">${product.number}</div>
              <button class="number-increase" onclick="increaseValue('${product.name}', ${product.id}, ${product.number}, '${product.image}', '${product.quantity}', '${product.priceNew}')">+</button>
            </div>
            <div class="product-detail-delete"><i class="fas fa-xmark"></i></div>
          </div>
      `;
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
  productListLeft.innerHTML = outputLeft;
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