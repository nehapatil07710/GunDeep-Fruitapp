export default function AdminProduct(props) {
  let { product } = props;

  let totalPrice =
    (product.mrp - (product.mrp * product.discount) / 100) * product.qty;

  function HandleEditbutton() {
    props.onHandleEditbutton("edit");
  }

  function HandleDeletebutton() {
    let ans = window.confirm(
      "Do you really want to delete " + product.name + "?"
    );
    if (ans) {
      props.onHandleDeletebutton(true);
    } else {
      props.onHandleDeletebutton(false);
    }
  }

  return (
    <div>
      <h1>Addmin</h1>
      <div className="col-10 col-md-5 col-lg-3 col-sm-3 border border-2 border-warning p-2">
        <div>
          <div className="block w-50 bg bg-secondary">
            {product.discount > 0 ? `${product.discount}% Discount` : ""}
          </div>
          <img
            src={`/public/Originals/${product.image}`}
            className="img-fluid"
            alt=""
          />
          <div className="text-white">{product.name}</div>
        </div>
        <div className="h3 text-white">
          {product.discount == 0 && <h4>Rs. {product.mrp}</h4>}
          {product.discount != 0 && (
            <h3 className="text-white">
              {" "}
              Rs.{" "}
              <span className="text-decoration-line-through text-white">
                {" "}
                {product.mrp}{" "}
              </span>{" "}
              <span className="text-white">{totalPrice}</span>
            </h3>
          )}
          <h5 className="text-white">(per {product.unit} ) </h5>
        </div>
        <div className="row">
          <div>
            <button className="btn btn-primary" onClick={HandleEditbutton}>
              <i className="bi bi-pen"></i>
            </button>
          </div>
          <div>
            <button className="btn btn-primary" onClick={HandleDeletebutton}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
