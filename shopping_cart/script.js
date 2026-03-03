
document.addEventListener("DOMContentLoaded",()=>{
    const additembtn = document.getElementById("add-items-btn");
    const productlist = document.getElementById("product-list");
    const cartitems = document.getElementById("cart-items");
    const emtycart= document.getElementById("empty-cart");
    const cardtotal = document.getElementById("cart-total");
    const totalPrice = document.getElementById("total-price");
    const checkoutbtn = document.getElementById("checkout-btn");
    const itemdeletebtn = document.getElementById("clear-cart-btn");
    let products =JSON.parse(localStorage.getItem('cart')) ||[];
    const cart=[];
    products.forEach(item => {
        renderproducts(item);
    });
    additembtn.addEventListener("click",()=>{
        const newProduct ={
            id: Date.now(),
            name:'product'+(products.length +1),
            price :Math.floor(Math.random()*100)+1 // because 0 naa deh deh price 
        }

        products.push(newProduct);
        savecart();
        console.log(products);
        renderproducts(newProduct);
    })

    function savecart(){
        localStorage.setItem("cart",JSON.stringify(products));
    }

    function renderproducts(item){
        const product = document.createElement("div");
        product.setAttribute("data-id",item.id);
        product.classList.add('product');
        product.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button data-id="${item.id}">Add to cart</button>
        `;
        productlist.appendChild(product);
    }
    itemdeletebtn.addEventListener("click",()=>{
        if(products.length>0) {
            products.pop();
            savecart();
        }
        productlist.innerHTML = "";  
        products.forEach(item => {
            renderproducts(item);
        });
            
    }) 
    
    productlist.addEventListener('click',(e)=>{
        if(e.target.tagName ==='BUTTON'){
            const productId = parseInt(  e.target.getAttribute('data-id')); // the id is stroed as string so we need to find that id datatype and convert it into number
            const pro = products.find(p =>p.id === productId);
            // find ko jiase condition match kari vahi pe voh puri value ko return karta means aage seacrh stop karke first where condition true returns that hnce in array object ehich matches that condition firts will get returned
            addToCart(pro);
        }

        function addToCart(pro){
            cart.push(pro);
            renderCart(cart);
        }
    })

    // we need to render the cart items 
    function renderCart(){
        cartitems.innerText="";
        let totalprice =0;

        if(cart.length>0){
            emtycart.classList.add("hidden");
            cardtotal.classList.remove("hidden"); // phele se hidden class thi keval usko remove kiya hai

            // ohh yeh item and index for each ki property hai jisme item is the current item and index is the index of that item in the array
            cart.forEach((item,index)=>{
                totalprice+=item.price;

                const CartItem = document.createElement('div');
                CartItem.innerHTML = `
                ${item.name} - $${item.price}
                `;
                cartitems.appendChild(CartItem);
                totalPrice.textContent = `${totalprice.toFixed(2)}`;
            })
        }else{
            emtycart.classList.remove("hidden");
            totalPrice.textContent = `$0.00`;
        }
    }
    checkoutbtn.addEventListener("click",()=>{
        cart.length=0;
        alert("Checkout successfully");      
        renderCart();
    });
})
