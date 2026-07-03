// Product Array

let products = JSON.parse(localStorage.getItem("products")) || [];

// Display Products on Page Load

displayProducts();
// Add Product

function addProduct() {
let salePrice = Number(document.getElementById("productSalePrice").value);
    let name = document.getElementById("productName").value.trim();
    let qty = parseInt(document.getElementById("productQty").value);
   let price = parseFloat(document.getElementById("productPrice").value); 
let category = document.getElementById("productCategory").value;
if (
    name === "" ||
    isNaN(qty) ||
    qty <= 0 ||
    isNaN(price) ||
    price <= 0 ||
   isNaN(salePrice) ||
    salePrice <= 0 ||
    category === ""
) {
        alert("Please enter a valid product name and quantity.");
        return;
    }

products.push({
    name: name,
    qty: qty,
    price: price,
     salePrice: salePrice, 
    category: category,
    date: new Date().toLocaleString()
});

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productName").value = "";
    document.getElementById("productQty").value = "";
    document.getElementById("productPrice").value = "";
document.getElementById("productCategory").value = "";
    displayProducts();
}// Edit Product

function editProduct(index) {

    let newName = prompt(
        "Enter New Product Name:",
        products[index].name
    );

    if (newName === null) return;

    newName = newName.trim();

    let newQty = prompt(
        "Enter New Quantity:",
        products[index].qty
    );

    if (newQty === null) return;

    newQty = parseInt(newQty);

    if (newName === "" || isNaN(newQty) || newQty <= 0) {
        alert("Invalid Input!");
        return;
    }

    products[index].name = newName;
    products[index].qty = newQty;

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
    products.push({
    name: name,
    qty: qty,
    price: price,          // purchase price
    salePrice: price,      // default same (later change kar sakte ho)
    category: category,
    date: new Date().toLocaleString()
});
}
function displayProducts() {
let totalValue = 0;
    let productList = document.getElementById("productList");

    productList.innerHTML = "";
let totalProfit = 0;
let totalLoss = 0;
    let totalStock = 0;
let lowStockCount = 0;
    products.forEach((product, index) => {
let stockClass = "";
totalValue += product.qty * product.price;
let profitPerItem = (product.salePrice - product.price) * product.qty;

if (profitPerItem >= 0) {
    totalProfit += profitPerItem;
} else {
    totalLoss += profitPerItem;
}

if (product.qty <= 5) {
    stockClass = "low-stock-card";
}
        totalStock += product.qty;

     let lowStock = "";

if(product.qty <= 5){

    lowStock = '<span class="low-stock"> [LOW STOCK]</span>';

    lowStockCount++;

}  

productList.innerHTML += `
    <div class="product ${stockClass}">

        <div class="product-name">
            ${product.name} (${product.category})
            <br>
            Qty: ${product.qty}
            <br>
            Price: Rs. ${product.price}
            <br>
            <small>Added: ${product.date}</small>
        </div>

        <div>
            <button onclick="increaseQty(${index})">+</button>
            <button onclick="decreaseQty(${index})">-</button>
            <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
        </div>

    </div>
        `;

    });

    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("totalStock").textContent = totalStock;
    document.getElementById("totalProductsCard").textContent = products.length;

document.getElementById("totalStockCard").textContent = totalStock;

document.getElementById("lowStockCard").textContent = lowStockCount;
document.getElementById("totalValue").textContent = totalValue;
document.getElementById("totalProfit").textContent = totalProfit;
document.getElementById("totalLoss").textContent = totalLoss;
}

// Delete Product

function deleteProduct(index) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
        return;
    }

    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
}
// Search Product

function searchProduct() {

    let input = document.getElementById("searchBox").value.toLowerCase();

    let productCards = document.querySelectorAll(".product");

    productCards.forEach(card => {

        let text = card.innerText.toLowerCase();

        if (text.includes(input)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });
}

// Increase Quantity

function increaseQty(index){

    products[index].qty++;

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();

}

// Decrease Quantity

function decreaseQty(index){

    if(products[index].qty > 1){

        products[index].qty--;

        localStorage.setItem("products", JSON.stringify(products));

        displayProducts();

    }else{

        alert("Quantity cannot be less than 1.");

    }

}
// Export to CSV

function exportCSV() {

    let csv = "Product Name,Quantity\n";

    products.forEach(product => {

        csv += `${product.name},${product.qty}\n`;

    });

    let blob = new Blob([csv], { type: "text/csv" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Inventory.csv";

    link.click();

}
function sortHighToLow() {
    products.sort((a, b) => b.qty - a.qty);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function sortLowToHigh() {
    products.sort((a, b) => a.qty - b.qty);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}