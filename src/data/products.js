const products = [
    {
        id: 1,
        title: "Fjallraven Backpack, Fits 15 Laptops",
        description: "Perfect pack for everyday use",
        code: "P001",
        price: 109.95,
        status: true,
        stock: 120,
        category: "men's clothing",
        thumbnails: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"]
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        description: "Slim-fitting style, lightweight and soft fabric",
        code: "P002",
        price: 22.3,
        status: true,
        stock: 259,
        category: "men's clothing",
        thumbnails: ["https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]
    },
    {
        id: 3,
        title: "Mens Cotton Jacket",
        description: "Great for Spring/Autumn/Winter",
        code: "P003",
        price: 55.99,
        status: true,
        stock: 500,
        category: "men's clothing",
        thumbnails: ["https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"]
    },
    {
        id: 4,
        title: "Mens Casual Slim Fit",
        description: "Color may vary slightly",
        code: "P004",
        price: 15.99,
        status: true,
        stock: 430,
        category: "men's clothing",
        thumbnails: ["https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"]
    },
    {
        id: 5,
        title: "John Hardy Women's Legends Bracelet",
        description: "Inspired by mythical water dragon",
        code: "P005",
        price: 695,
        status: true,
        stock: 400,
        category: "jewelery",
        thumbnails: ["https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"]
    },
    {
        id: 6,
        title: "Solid Gold Petite Micropave",
        description: "Satisfaction Guaranteed, Return or exchange",
        code: "P006",
        price: 168,
        status: true,
        stock: 70,
        category: "jewelery",
        thumbnails: ["https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"]
    },
    {
        id: 7,
        title: "White Gold Plated Princess",
        description: "Classic Wedding Engagement Solitaire Diamond",
        code: "P007",
        price: 9.99,
        status: true,
        stock: 400,
        category: "jewelery",
        thumbnails: ["https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"]
    },
    {
        id: 8,
        title: "Pierced Owl Rose Gold Plated",
        description: "Double Flared Tunnel Plug Earrings",
        code: "P008",
        price: 10.99,
        status: true,
        stock: 100,
        category: "jewelery",
        thumbnails: ["https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"]
    },
    {
        id: 9,
        title: "WD 2TB Elements Portable External",
        description: "USB 3.0 and USB 2.0 Compatibility",
        code: "P009",
        price: 64,
        status: true,
        stock: 203,
        category: "electronics",
        thumbnails: ["https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"]
    },
    {
        id: 10,
        title: "SanDisk SSD PLUS 1TB",
        description: "Easy upgrade for faster boot",
        code: "P010",
        price: 109,
        status: true,
        stock: 470,
        category: "electronics",
        thumbnails: ["https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"]
    },
    {
        id: 11,
        title: "Silicon Power 256GB SSD",
        description: "High transfer speeds and performance",
        code: "P011",
        price: 109,
        status: true,
        stock: 319,
        category: "electronics",
        thumbnails: ["https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"]
    },
    {
        id: 12,
        title: "WD 4TB Gaming Drive",
        description: "Expand your PS4 gaming experience",
        code: "P012",
        price: 114,
        status: true,
        stock: 400,
        category: "electronics",
        thumbnails: ["https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"]
    },
    {
        id: 13,
        title: "Acer SB220Q bi 21.5",
        description: "Full HD widescreen IPS display",
        code: "P013",
        price: 599,
        status: true,
        stock: 250,
        category: "electronics",
        thumbnails: ["https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"]
    },
    {
        id: 14,
        title: "Samsung 49-Inch CHG90",
        description: "Super Ultrawide Screen QLED",
        code: "P014",
        price: 999.99,
        status: true,
        stock: 140,
        category: "electronics",
        thumbnails: ["https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"]
    },
    {
        id: 15,
        title: "BIYLACLESEN Women's 3-in-1",
        description: "Snowboard Jacket Winter Coats",
        code: "P015",
        price: 56.99,
        status: true,
        stock: 235,
        category: "women's clothing",
        thumbnails: ["https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"]
    },
    {
        id: 16,
        title: "Lock and Love Women's Jacket",
        description: "Removable Hooded Faux Leather Moto Biker",
        code: "P016",
        price: 29.95,
        status: true,
        stock: 340,
        category: "women's clothing",
        thumbnails: ["https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"]
    },
    {
        id: 17,
        title: "Rain Jacket Women Windbreaker",
        description: "Striped Climbing Raincoats",
        code: "P017",
        price: 39.99,
        status: true,
        stock: 679,
        category: "women's clothing",
        thumbnails: ["https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"]
    },
    {
        id: 18,
        title: "MBJ Women's Solid Short Sleeve",
        description: "Boat Neck V",
        code: "P018",
        price: 9.85,
        status: true,
        stock: 130,
        category: "women's clothing",
        thumbnails: ["https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"]
    },
    {
        id: 19,
        title: "Opna Women's Short Sleeve",
        description: "Moisture Wicking Fabric",
        code: "P019",
        price: 7.95,
        status: true,
        stock: 146,
        category: "women's clothing",
        thumbnails: ["https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"]
    },
    {
        id: 20,
        title: "DANVOUY Womens T Shirt",
        description: "Casual Cotton Short",
        code: "P020",
        price: 12.99,
        status: true,
        stock: 145,
        category: "women's clothing",
        thumbnails: ["https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"]
    }
];


module.exports = { products };