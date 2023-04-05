import '../styles/cart_component.css'
import '../styles/scrollbar.css'

function shoppingCart() {
    const getCartItems = () => {
        return JSON.parse(localStorage.getItem('cartItems')) || []
    };

    const removeFromCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
        const existingItemIndex = cartItems.findIndex(item => (
          item.id === product.id &&
          item.name === product.name &&
          item.image === product.image &&
          item.value === product.value
        ));
      
        if (existingItemIndex !== -1) {
          if (cartItems[existingItemIndex].quantity > 1) {
            cartItems[existingItemIndex].quantity -= 1;
          } else {
            cartItems.splice(existingItemIndex, 1)
          }
        }
      
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        console.log(localStorage)
    };

    let total = () => {
        const items = getCartItems()
        let total = 0
        items.forEach(element => {
            total = total + element.value * element.quantity
        });
        return total
    }


    let listComponents = [];

    let productList = getCartItems()
    productList.reduce((accumulator, product, index) => {
    accumulator.push(
        <p>
            <div class="cart_container" key={index}>
                <h2>{product.quantity} {product.name}</h2>
                <img src={product.image} alt={product.name} />
                <p>R$:{product.value}</p>
                <input type="button" onClick={() => removeFromCart(product)} value="REMOVE" />
            </div>
        </p>
    );

    if ((index + 1) % 4 === 0 || index === productList.length - 1) {
        listComponents.push(
        <div class="cart_row" key={accumulator[0].key}>
            {accumulator}
        </div>
        );
        return [];
    } else {
        return accumulator;
    }
}, []);

    return (
        <div className="shopping-cart">
            {listComponents}
            <p>
                <div class="footer">
                    O total do valor a se pagar é de {total()}
                </div>
            </p>
        </div>
    );
}
  
export default shoppingCart 