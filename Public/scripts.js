document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    fetchCustomers();
    fetchSalesSummary();
    fetchInventoryLowStock();
});

async function fetchProducts() {
    const response = await fetch('/api/products'); // Backend endpoint
    const products = await response.json();
    const container = document.getElementById('products-container');
    container.innerHTML = createTable(products, ['Product_ID', 'Product_Name', 'Stock_Level', 'Product_Cost']);
}

async function fetchCustomers() {
    const response = await fetch('/api/customers');
    const customers = await response.json();
    const container = document.getElementById('customers-container');
    container.innerHTML = createTable(customers, ['Customer_ID', 'Customer_Name', 'Customer_Email']);
}

async function fetchSalesSummary() {
    const response = await fetch('/api/sales-summary');
    const sales = await response.json();
    const container = document.getElementById('sales-container');
    container.innerHTML = createTable(sales, ['Month', 'Total_Products_Sold', 'Total_Sales_Amount']);
}

async function fetchInventoryLowStock() {
    const response = await fetch('/api/inventory-low-stock');
    const inventory = await response.json();
    const container = document.getElementById('inventory-container');
    container.innerHTML = createTable(inventory, ['Product_Name', 'Stock_Level', 'Reorder_Level']);
}

function createTable(data, columns) {
    let html = '<table><thead><tr>';
    columns.forEach(column => html += `<th>${column}</th>`);
    html += '</tr></thead><tbody>';
    data.forEach(row => {
        html += '<tr>';
        columns.forEach(column => html += `<td>${row[column]}</td>`);
        html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
}
