let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mode = 'create';
let temp;


// Function To Get Total 
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) -
            +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#252545';
    }


}


// Function To Create Product 
let productList;
if (localStorage.products != null) {

    productList = JSON.parse(localStorage.products)
} else {
    productList = [];
}

function create() {


    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (mode === 'create') {

        if (newProduct.count > 1)
            for (let i = 0; i < newProduct.count; i++) {
                productList.push(newProduct);
            } else {
                productList.push(newProduct);
            }
    } else {
        productList[temp] = newProduct;
        mode = 'create';
        submit.innerHTML = 'Create'
        count.style.display = 'block'

    }

    //save to local storage
    localStorage.setItem('products', JSON.stringify(productList))

    clear()
    show()
}


// Function To Clear Date 
function clear() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';


}


// // Function To Show Date 
function show() {
    getTotal();
    let table = ''
    for (let i = 0; i < productList.length; i++) {
        table += `  
      <tr>
        <td>${i+1}</td>
        <td>${productList[i].title}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].taxes}</td>
        <td>${productList[i].ads}</td>
        <td>${productList[i].discount}</td>
        <td>${productList[i].count}</td>
        <td>${productList[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;

    let deleteAllBtn = document.getElementById("deleteAllBtn")
    if (productList.length > 0) {

        deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete All (${productList.length})</button>`
    } else {
        deleteAllBtn.innerHTML = '';
    }
}
show()


// // Function To Delete Date 
function deleteData(i) {
    productList.splice(i, 1);
    localStorage.products = JSON.stringify(productList);
    show();

}

// // Function To Delete Date 
function deleteAll() {

    localStorage.clear()
    productList.splice(0);
    show();


}



//  Function To Update Date 

function updateData(i) {
    title.value = productList[i].title;
    price.value = productList[i].price;
    taxes.value = productList[i].taxes;
    ads.value = productList[i].ads;
    discount.value = productList[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = productList[i].category;
    submit.innerHTML = "Update";
    mode = update;
    temp = i;

    scroll({
        top: 0,
        behavior: "smooth",
    })


}


// Function To Search in Date 
let searchMood = 'title';

function getSearchMood(id) {
    let searchBy = document.getElementById('search')

    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    searchBy.placeholder = 'Search By ' + searchMood;

    searchBy.focus()
    searchBy.value = '';
    show();

}


function search(value) {
    let table = '';


    for (let i = 0; i < productList.length; i++) {

        if (searchMood === 'title') {
            if (productList[i].title.includes(value.toLowerCase())) {

                table += `  
                <tr>
                  <td>${i+1}</td>
                  <td>${productList[i].title}</td>
                  <td>${productList[i].price}</td>
                  <td>${productList[i].taxes}</td>
                  <td>${productList[i].ads}</td>
                  <td>${productList[i].discount}</td>
                  <td>${productList[i].count}</td>
                  <td>${productList[i].category}</td>
                  <td><button id="update" onclick="updateData(${i})">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }

        } else {

            if (productList[i].category.includes(value.toLowerCase())) {

                table += `  
            <tr>
              <td>${i+1}</td>
              <td>${productList[i].title}</td>
              <td>${productList[i].price}</td>
              <td>${productList[i].taxes}</td>
              <td>${productList[i].ads}</td>
              <td>${productList[i].discount}</td>
              <td>${productList[i].count}</td>
              <td>${productList[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
            }



        }

    }
    document.getElementById('tbody').innerHTML = table;

}