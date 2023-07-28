'use strict';



/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
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

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionCollapse = header.nextElementSibling;

    // Check if the accordion collapse is currently visible
    const isVisible = window.getComputedStyle(accordionCollapse).display !== 'none';

    if (isVisible) {
      // If visible, hide the accordion collapse
      accordionCollapse.style.display = 'none';
      // Update the chevron icons accordingly
      header.querySelector('.glyphicon-chevron-up').style.display = 'none';
      header.querySelector('.glyphicon-chevron-down').style.display = 'inline';
    } else {
      // If hidden, show the accordion collapse
      accordionCollapse.style.display = 'block';
      // Update the chevron icons accordingly
      header.querySelector('.glyphicon-chevron-up').style.display = 'inline';
      header.querySelector('.glyphicon-chevron-down').style.display = 'none';
    }
  });
});


const productList = document.querySelector('.product-body');
let output ='';

const url = 'http://localhost:2000/inters';

const itemsPerPage = 12; // Số phần tử trên mỗi trang
// Khai báo các biến cần thiết
let intersData = [];
let currentPage = 1;
let selectedProductTypes = []; // Mảng chứa các productType được chọn

// Lấy dữ liệu từ API và hiển thị dữ liệu và phân trang
fetch(url)
    .then(res => res.json())
    .then(data => {
      intersData = data;
      filterData();
    })

    // Lấy tất cả các checkbox productType bên trong accordion
    const checkboxes = document.querySelectorAll('.accordion-item input[name="productType"]');

    // Gắn sự kiện change cho tất cả các checkbox productType
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterData);
    });

    // Hàm lọc dữ liệu dựa trên các checkbox productType
    function filterData() {
      const selectedProductTypes = getSelectedProductTypes();
      const filteredData = intersData.filter(inter => {
        // Nếu không có checkbox nào được chọn, hiển thị tất cả các phần tử
        if (selectedProductTypes.length === 0) {
          return true;
        }

        // Kiểm tra nếu productType của sản phẩm nằm trong danh sách các productType đã chọn
        return selectedProductTypes.includes(inter.productType);
      });

      currentPage = 1; // Reset trang về 1 sau khi lọc dữ liệu
      renderItems(currentPage, filteredData);
      renderPagination(filteredData);
    }
    function getSelectedProductTypes() {
      const checkboxes = document.querySelectorAll('input[name="productType"]:checked');
      const selectedProductTypes = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));
      return selectedProductTypes;
    }
    
    // Hàm để hiển thị danh sách sản phẩm lên giao diện
function renderItems(page, data) {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Xóa nội dung cũ trước khi hiển thị
  if (!data || data.length === 0) {
    // Nếu không có dữ liệu hoặc data là undefined hoặc rỗng, không hiển thị sản phẩm nào
    // Có thể hiển thị thông báo hoặc không thực hiện gì cả tùy theo yêu cầu của bạn
    return;
  }
  // Tính toán chỉ mục bắt đầu và chỉ mục kết thúc cho trang hiện tại
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // Hiển thị danh sách sản phẩm lên giao diện
  console.log(currentItems);
  currentItems.forEach(inter => {
    const productElement = document.createElement("div");
    productElement.classList.add("product", "item");
    productElement.innerHTML = `
      <div class="product-image" style="background-image: url(${inter.image});">
        ${inter.bestseller ? '<div class="bestseller">bestseller</div>' : ''}
        ${inter.newProduct ? '<div class="new">new</div>' : ''}
        ${inter.sale ? '<div class="sale">sale</div>' : ''}
      </div>
      <div class="product-name">${inter.name}</div>
      <div class="product-price">
        ${inter.priceOld !== '' ? `<div class="price-old">${`$ `+inter.priceOld}</div>` : `<div class="price-old" style="margin-right: 30px;"></div>`}
        ${inter.priceNew !== -1 ? `<div class="price-new">${`$ `+inter.priceNew}</div>` : ''}
      </div>
    `;
    // Thêm sự kiện click vào sản phẩm
    productElement.addEventListener("click", () => {
      // Lấy ID của sản phẩm khi người dùng click
      const productId = inter.id;
      // Chuyển hướng đến trang chi tiết và truyền ID của sản phẩm bằng query parameters
      window.location.href = `productDetail.html?id=${productId}`;
    });
    productList.appendChild(productElement);
  });
}

// Hàm để tạo các nút chuyển trang
function renderPagination(data) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Xóa nội dung cũ trước khi hiển thị

  if (!data || !Array.isArray(data) || data.length === 0) {
    // Nếu không có dữ liệu hoặc data không phải là mảng hoặc là một mảng rỗng, không hiển thị nút phân trang
    // Có thể hiển thị thông báo hoặc không thực hiện gì cả tùy theo yêu cầu của bạn
    return;
  }
  // Tính tổng số trang dựa trên tổng số sản phẩm và số sản phẩm trên mỗi trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Tạo các nút trang ở giữa
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("div");
    pageButton.textContent = i;
    pageButton.classList.add("pagination-button");
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderItems(currentPage, data);
      renderPagination(data);
    });
    pagination.appendChild(pageButton);
  }

  // Kiểm tra và thêm nút "Prev" nếu không ở trang đầu tiên
  if (currentPage > 1) {
    const prevButton = document.createElement("div");
    prevButton.innerHTML = `<i class="fas fa-chevron-left"></i>`;
    prevButton.classList.add("pagination-button", "pagination-prev");
    prevButton.addEventListener("click", () => {
      currentPage -= 1;
      renderItems(currentPage, data);
      renderPagination(data);
    });
    pagination.insertBefore(prevButton, pagination.firstChild);
  }

  // Kiểm tra và thêm nút "Next" nếu không ở trang cuối cùng
  if (currentPage < totalPages) {
    const nextButton = document.createElement("div");
    nextButton.innerHTML = `<i class="fas fa-chevron-right"></i>`;
    nextButton.classList.add("pagination-button", "pagination-next");
    nextButton.addEventListener("click", () => {
      currentPage += 1;
      renderItems(currentPage, data);
      renderPagination(data);
    });
    pagination.appendChild(nextButton);
  }

  // Lặp qua các nút trang để kiểm tra và thêm lớp "pagination-current" cho nút trang hiện tại
  const paginationButtons = pagination.getElementsByClassName("pagination-button");
  for (let i = 0; i < paginationButtons.length; i++) {
    const button = paginationButtons[i];
    const pageNumber = parseInt(button.textContent);
    if (pageNumber === currentPage) {
      button.classList.add("pagination-current");
    } else {
      button.classList.remove("pagination-current");
    }
  }
}



fetch(url)
    .then(res => res.json())
    .then(data=>renderProductType(data))




function showValue(productKey, productValue) {
  var key = "";
  var value = "("+productValue+")"
  key+=productKey;
  document.getElementById(key).innerHTML = value;
}



function convertToLetter(key) {
  const letters = ['productType0', 'productType1', 'productType2', 'productType3', 'productType4', 'productType5', 'productType6'];
  return letters[key] || "Invalid";
}

function initializeCountObject() {
  const countByProductType = {};
  const letters = ['productType0', 'productType1', 'productType2', 'productType3', 'productType4', 'productType5', 'productType6'];

  letters.forEach(letter => {
      countByProductType[letter] = 0;
  });

  return countByProductType;
}

const countByProductType = initializeCountObject();

const renderProductType = (product) =>{
  product.forEach(item => {
    const productType = parseInt(item.productType);
    if (isNaN(productType) || productType < 0 || productType > 6) {
        console.error(`Giá trị không hợp lệ: ${item.productType}`);
        return; 
    }
  
    countByProductType[convertToLetter(productType)]++;
  });
  Object.entries(countByProductType).forEach((key) => {
    if(key[1]>0){
      showValue(""+key[0],key[1]);
    }
  });
}