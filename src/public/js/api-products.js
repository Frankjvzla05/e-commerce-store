// api/products


const ulProducts = document.querySelector("ul");

const getProducts = async () => {
    let params = new URLSearchParams(location.search);
    let page = params.get("page");
    if (!page || isNaN(Number(page))) {
        page = 1;
    }

    let respuesta = await fetch(`/api/products?page=${page}`);
    let datos = await respuesta.json();
    console.log(datos);

    // Limpiar la lista de productos antes de agregar los nuevos
    ulProducts.innerHTML = "";

    // Recorrer y mostrar los productos en la lista
    datos.products.docs.forEach(p => {
        let liProduct = document.createElement("li");
        liProduct.textContent = `${p.pid}) ${p.title} - ${p.category}`;
        ulProducts.append(liProduct);
    });

    // Crear enlace a la primera página
    const aFirstPage = document.createElement("a");
    aFirstPage.textContent = `Pág. 1`;
    aFirstPage.href = `/products?page=1`;
    document.body.append(aFirstPage);

    // Crear enlace a la página anterior
    const aPrevPage = document.createElement("a");
    aPrevPage.textContent = `Pág. Ant.`;
    aPrevPage.href = `/products?page=${datos.products.prevPage}`;
    if (!datos.products.hasPrevPage) {
        aPrevPage.classList.add("disabled");
    }
    document.body.append(aPrevPage);

    // Crear enlace a la página siguiente
    const aNextPage = document.createElement("a");
    aNextPage.textContent = `Pág. Sig.`;
    aNextPage.href = `/products?page=${datos.products.nextPage}`;
    if (!datos.products.hasNextPage) {
        aNextPage.classList.add("disabled");
    }
    document.body.append(aNextPage);

    // Crear enlace a la última página
    const aLastPage = document.createElement("a");
    aLastPage.textContent = `Última Pág.`;
    aLastPage.href = `/products?page=${datos.products.totalPages}`;
    document.body.append(aLastPage);
};

// Llamar a la función para cargar los productos
getProducts();
