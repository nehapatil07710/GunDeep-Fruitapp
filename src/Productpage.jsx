import Product from "./Product";

export default function ProductsPage(props) {
  let {productList}= props;
  let {handleAddToCart} =props
  let {handleIncrementQuantity}=props
  let {handleDecrementQuantity}=props;
  return (
    <div className="container-fluid product-container">
  <div className="row p-2 justify-content-center"
    
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  }}>

      {productList.map((product, index) => (
        <Product
  key={product.id}
  product={product}
  handleAddToCart={() => handleAddToCart(product.id)}
  incrementQuantity={() => handleIncrementQuantity(product.id)}
  decrementQuantity={() => handleDecrementQuantity(product.id)}
/>
      ))}
    </div>
    </div>
  );
}
