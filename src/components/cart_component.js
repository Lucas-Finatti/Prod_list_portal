import '../styles/cart_component.css'
import '../styles/scrollbar.css'

// Define a função shoppingCart
function shoppingCart() {

    // Define a função getCartItems que retorna um array com os itens do carrinho de compras ou um array vazio caso não exista nada no carrinho
    const getCartItems = () => {
        return JSON.parse(localStorage.getItem('cartItems')) || []
    };

    // Define a função removeFromCart que recebe um produto como parâmetro, encontra o índice do item correspondente no array de itens do carrinho, e o remove ou diminui a quantidade de acordo com a condição
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

    // Define a função total que calcula o valor total dos itens no carrinho
    let total = () => {
        const items = getCartItems()
        let total = 0
        items.forEach(element => {
            total = total + element.value * element.quantity
        });
        return total
    }

    // Inicia um array vazio para armazenar os componentes do carrinho
    let listComponents = [];

    // Obtém os produtos do carrinho
    let productList = getCartItems()

    // Utiliza a função reduce para iterar pelos produtos do carrinho e criar elementos de lista para cada item
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

    // Verifica se o índice atual é múltiplo de 4 ou é o último item da lista e,
    // em seguida, adiciona uma nova linha de carrinho à lista de componentes
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

    // Retorna o componente de carrinho de compras que inclui a lista de componentes e o valor total
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

// Exporta a função shoppingCart como padrão para ser usada em outros arquivos
export default shoppingCart 
