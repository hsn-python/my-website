/* =========================
   IMAGE SLIDER
========================= */

const sliderTrack =
    document.getElementById("slider-track");

if (sliderTrack) {

    let currentSlide = 0;

    const totalSlides = 3;

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        const moveAmount =
            currentSlide * 33.3333;

        sliderTrack.style.transform =
            `translateX(-${moveAmount}%)`;
    }

    setInterval(nextSlide, 3000);
}


/* =========================
   SIDE MENU
========================= */

const menuButton =
    document.getElementById("menu-button");

const closeMenu =
    document.getElementById("close-menu");

const sideMenu =
    document.getElementById("side-menu");

const overlay =
    document.getElementById("overlay");


if (menuButton && sideMenu && overlay) {

    menuButton.addEventListener(
        "click",
        function() {

            sideMenu.classList.add("open");
            overlay.classList.add("open");

        }
    );

}


if (closeMenu) {

    closeMenu.addEventListener(
        "click",
        function() {

            sideMenu.classList.remove("open");
            overlay.classList.remove("open");

        }
    );

}


/* =========================
   CATEGORY DROPDOWN
========================= */

const categoryButton =
    document.getElementById("category-button");

const categoryDropdown =
    document.getElementById("category-dropdown");


if (categoryButton && categoryDropdown) {

    categoryButton.addEventListener(
        "click",
        function() {

            categoryDropdown.classList.toggle("open");

        }
    );

}


/* =========================
   SEARCH
========================= */

const searchButton =
    document.getElementById("search-button");

const searchContainer =
    document.getElementById("search-container");

const searchInput =
    document.getElementById("search-input");


if (searchButton && searchContainer) {

    searchButton.addEventListener(
        "click",
        function() {

            searchContainer.classList.toggle("open");


            if (searchContainer.classList.contains("open")) {

                if (overlay) {
                    overlay.classList.add("open");
                }

                if (searchInput) {
                    searchInput.focus();
                }

            } else {

                if (overlay) {
                    overlay.classList.remove("open");
                }

            }

        }
    );

}


/* =========================
   CART PANEL
========================= */

const cartButton =
    document.getElementById("cart-button");

const cartPanel =
    document.getElementById("cart-panel");

const cartClose =
    document.getElementById("cart-close");


function openCart() {

    if (!cartPanel) {
        return;
    }

    cartPanel.classList.add("open");

    if (overlay) {
        overlay.classList.add("open");
    }

    displayCart();

}


function closeCart() {

    if (cartPanel) {
        cartPanel.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("open");
    }

}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCart
    );

}


/* =========================
   CLICK DARK AREA
========================= */

if (overlay) {

    overlay.addEventListener(
        "click",
        function() {

            if (sideMenu) {
                sideMenu.classList.remove("open");
            }

            if (cartPanel) {
                cartPanel.classList.remove("open");
            }

            if (searchContainer) {
                searchContainer.classList.remove("open");
            }

            overlay.classList.remove("open");

        }
    );

}


/* =========================
   CART DATA
========================= */

function getCart() {

    const savedCart =
        localStorage.getItem("shoppingCart");

    if (savedCart) {

        return JSON.parse(savedCart);

    }

    return [];

}


function saveCart(cart) {

    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(cart)
    );

}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    if (!cartItems || !cartPanel) {
        return;
    }


    /* Remove previous total section */

    const oldBottom =
        cartPanel.querySelector(".cart-bottom");

    if (oldBottom) {
        oldBottom.remove();
    }


    const cart =
        getCart();


    /* Calculate grand total */

    let grandTotal = 0;


    cart.forEach(function(item) {

        grandTotal +=
            item.price * item.quantity;

    });


    /* =========================
       EMPTY CART
    ========================= */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                NO SELECTED ITEM
            </p>
        `;

    }


    /* =========================
       CART WITH ITEMS
    ========================= */

    else {

        cartItems.innerHTML = "";


        cart.forEach(function(item) {

            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";


            const itemTotal =
                item.price * item.quantity;


            cartItem.innerHTML = `

                <div class="cart-item-image">
                    Picture
                </div>

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Weight: ${item.weight}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p>
                        $${item.price}
                    </p>

                </div>

                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>

                <button
                    class="remove-cart-item"
                    data-id="${item.id}">
                    🗑️
                </button>

            `;


            cartItems.appendChild(cartItem);

        });


        /* Remove buttons */

        const removeButtons =
            cartItems.querySelectorAll(
                ".remove-cart-item"
            );


        removeButtons.forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const id =
                            Number(
                                button.dataset.id
                            );


                        const updatedCart =
                            getCart().filter(
                                function(item) {

                                    return item.id !== id;

                                }
                            );


                        saveCart(updatedCart);

                        displayCart();

                    }
                );

            }
        );

    }


    /* =========================
       CART BOTTOM
    ========================= */

    const cartBottom =
        document.createElement("div");

    cartBottom.className =
        "cart-bottom";


    cartBottom.innerHTML = `

        <div class="shipping-message">
            The shipping fee is calculated on check-out
        </div>

        <div class="cart-total">
            $${grandTotal.toFixed(2)}
        </div>

    `;


    cartPanel.appendChild(cartBottom);

}


/* =========================
   PRODUCT DATA
========================= */

const products = [

    {
        id: 1,
        name: "Item A",
        weight: "500 g",
        price: 10,
        description:
            "This is the description for Item A."
    },

    {
        id: 2,
        name: "Item B",
        weight: "750 g",
        price: 15,
        description:
            "This is the description for Item B."
    },

    {
        id: 3,
        name: "Item C",
        weight: "1 kg",
        price: 20,
        description:
            "This is the description for Item C."
    },

    {
        id: 4,
        name: "Item D",
        weight: "500 g",
        price: 12,
        description:
            "This is the description for Item D."
    },

    {
        id: 5,
        name: "Item E",
        weight: "750 g",
        price: 18,
        description:
            "This is the description for Item E."
    },

    {
        id: 6,
        name: "Item F",
        weight: "1 kg",
        price: 25,
        description:
            "This is the description for Item F."
    },

    {
        id: 7,
        name: "Item G",
        weight: "500 g",
        price: 11,
        description:
            "This is the description for Item G."
    },

    {
        id: 8,
        name: "Item H",
        weight: "750 g",
        price: 16,
        description:
            "This is the description for Item H."
    },

    {
        id: 9,
        name: "Item I",
        weight: "1 kg",
        price: 22,
        description:
            "This is the description for Item I."
    },

    {
        id: 10,
        name: "Item J",
        weight: "500 g",
        price: 14,
        description:
            "This is the description for Item J."
    },

    {
        id: 11,
        name: "Item K",
        weight: "750 g",
        price: 17,
        description:
            "This is the description for Item K."
    },

    {
        id: 12,
        name: "Item L",
        weight: "1 kg",
        price: 24,
        description:
            "This is the description for Item L."
    },

    {
        id: 13,
        name: "Item M",
        weight: "500 g",
        price: 13,
        description:
            "This is the description for Item M."
    },

    {
        id: 14,
        name: "Item N",
        weight: "750 g",
        price: 19,
        description:
            "This is the description for Item N."
    },

    {
        id: 15,
        name: "Item O",
        weight: "1 kg",
        price: 21,
        description:
            "This is the description for Item O."
    },

    {
        id: 16,
        name: "Item P",
        weight: "500 g",
        price: 16,
        description:
            "This is the description for Item P."
    },

    {
        id: 17,
        name: "Item Q",
        weight: "750 g",
        price: 20,
        description:
            "This is the description for Item Q."
    },

    {
        id: 18,
        name: "Item R",
        weight: "1 kg",
        price: 26,
        description:
            "This is the description for Item R."
    },

    {
        id: 19,
        name: "Item S",
        weight: "500 g",
        price: 15,
        description:
            "This is the description for Item S."
    },

    {
        id: 20,
        name: "Item T",
        weight: "750 g",
        price: 18,
        description:
            "This is the description for Item T."
    }

];


/* =========================
   SHOP PRODUCTS
========================= */

const productsContainer =
    document.getElementById("products");


if (productsContainer) {

    let currentPage = 1;

    const itemsPerPage = 20;


    function showProducts() {

        productsContainer.innerHTML = "";


        const start =
            (currentPage - 1) *
            itemsPerPage;


        const end =
            start + itemsPerPage;


        const pageProducts =
            products.slice(start, end);


        pageProducts.forEach(
            function(product) {

                const productBox =
                    document.createElement("div");


                productBox.className =
                    "product-box";


                productBox.innerHTML = `

                    <div class="product-image">
                        Picture
                    </div>

                    <p>
                        ${product.name}
                    </p>

                `;


                productBox.addEventListener(
                    "click",
                    function() {

                        window.location.href =
                            "product.html?id=" +
                            product.id;

                    }
                );


                productsContainer.appendChild(
                    productBox
                );

            }
        );

    }


    const pageNumbers =
        document.querySelectorAll(
            ".page-number"
        );


    const previousPage =
        document.getElementById(
            "previous-page"
        );


    const nextPage =
        document.getElementById(
            "next-page"
        );


    function updatePage() {

        showProducts();


        pageNumbers.forEach(
            function(button) {

                const page =
                    Number(
                        button.dataset.page
                    );


                if (page === currentPage) {

                    button.classList.add(
                        "active"
                    );

                } else {

                    button.classList.remove(
                        "active"
                    );

                }

            }
        );


        if (previousPage) {

            if (currentPage === 1) {

                previousPage.style.display =
                    "none";

            } else {

                previousPage.style.display =
                    "block";

            }

        }


        if (nextPage) {

            if (currentPage === 3) {

                nextPage.style.display =
                    "none";

            } else {

                nextPage.style.display =
                    "block";

            }

        }

    }


    pageNumbers.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    currentPage =
                        Number(
                            button.dataset.page
                        );

                    updatePage();

                }
            );

        }
    );


    if (previousPage) {

        previousPage.addEventListener(
            "click",
            function() {

                if (currentPage > 1) {

                    currentPage--;

                    updatePage();

                }

            }
        );

    }


    if (nextPage) {

        nextPage.addEventListener(
            "click",
            function() {

                if (currentPage < 3) {

                    currentPage++;

                    updatePage();

                }

            }
        );

    }


    updatePage();

}


/* =========================
   PRODUCT PAGE
========================= */

const productName =
    document.getElementById(
        "product-name"
    );


if (productName) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            urlParams.get("id")
        );


    const product =
        products.find(
            function(item) {

                return item.id === productId;

            }
        );


    if (product) {

        document.getElementById(
            "product-name"
        ).textContent =
            product.name;


        document.getElementById(
            "product-weight"
        ).textContent =
            "Weight: " +
            product.weight;


        document.getElementById(
            "product-price"
        ).textContent =
            "Price: $" +
            product.price;


        document.getElementById(
            "product-description"
        ).textContent =
            product.description;


        /* =========================
           QUANTITY
        ========================= */

        let quantity = 1;


        const quantityDisplay =
            document.getElementById(
                "quantity"
            );


        const minusButton =
            document.getElementById(
                "minus-button"
            );


        const plusButton =
            document.getElementById(
                "plus-button"
            );


        if (plusButton) {

            plusButton.addEventListener(
                "click",
                function() {

                    quantity++;

                    quantityDisplay.textContent =
                        quantity;

                }
            );

        }


        if (minusButton) {

            minusButton.addEventListener(
                "click",
                function() {

                    if (quantity > 1) {

                        quantity--;

                        quantityDisplay.textContent =
                            quantity;

                    }

                }
            );

        }


        /* =========================
           ADD TO CART
        ========================= */

        const addCartButton =
            document.getElementById(
                "add-cart-button"
            );


        if (addCartButton) {

            addCartButton.addEventListener(
                "click",
                function() {

                    const cart =
                        getCart();


                    const existingItem =
                        cart.find(
                            function(item) {

                                return item.id ===
                                    product.id;

                            }
                        );


                    if (existingItem) {

                        existingItem.quantity +=
                            quantity;

                    } else {

                        cart.push({

                            id: product.id,

                            name: product.name,

                            weight: product.weight,

                            price: product.price,

                            quantity: quantity

                        });

                    }


                    saveCart(cart);

                    openCart();

                }
            );

        }

    }

}