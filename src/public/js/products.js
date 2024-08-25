const socket=io()

const productsBox = document.getElementById("products")
const inputProductTitle = document.getElementById('title');
const inputProductDescription = document.getElementById('description');
const inputProductCode = document.getElementById('code');
const inputProductPrice = document.getElementById('price');
const inputProductStock = document.getElementById('stock');
const inputProductCategory = document.getElementById('category');
const submitProduct=document.getElementById("submitProduct");

const deleteProduct = async (pid) =>{
    let response = await fetch(`/api/products/${pid}`, {
        method: "delete"
    })
    let datos=await response.json()
    console.log(datos, response.status)
    location.reload()
}

const createProduct = async (product) =>{
    try {
        let response = await fetch("/api/products/", {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "post", 
            body: JSON.stringify(product)
        })
        let datos=await response.json()
        if(response.status !== 201) {
            alert(datos.error)
        } else {
            console.log(datos, response.status)
            location.reload()
        }
    } catch (error) {
        console.error("Error al intentar crear el producto:", error);
        alert("Hubo un problema con la creación del producto. Por favor, intenta de nuevo.");
    }
}

submitProduct.addEventListener("click", async(e) => {
    e.preventDefault()

    let title = inputProductTitle.value.trim()
    let description = inputProductDescription.value.trim()
    let code = inputProductCode.value.trim()
    let price = Number(inputProductPrice.value.trim())
    let status = true
    let stock = Number(inputProductStock.value.trim())
    let category = inputProductCategory.value.trim()

    let product = {
        title,
        description,
        code, 
        price, 
        status, 
        stock, 
        category
    }

    createProduct(product)
})

socket.on('newProduct', newProduct => {
    let liNewProduct = document.createElement('li')
    let pNewProduct = document.createElement('p')
    let buttonNewProduct = document.createElement('button')
    liNewProduct.setAttribute('style', "display: flex; align-items:center")
    buttonNewProduct.innerHTML = "Eliminar"
    buttonNewProduct.onclick(`deleteProduct(${pid})`)
    buttonNewProduct.setAttribute('style', "height: fit-content; margin-left:1rem")
    pNewProduct.innerHTML = `${newProduct.title} - ${newProduct.price}`
    liNewProduct.append(pNewProduct)
    liNewProduct.append(buttonNewProduct)
    productsBox.append(liNewProduct)
})





