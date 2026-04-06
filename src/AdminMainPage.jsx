import { useState } from "react";
import AdminProduct from "./AdminProduct";
import AdminProductForm from "./AdminProductForm"; // Ensure this exists

export default function AdminMainPage() {
  let [AdminView, setAdminView] = useState("list");
  let [selectedProduct, setSelectedProduct] = useState(""); 
  let {filterdProductList} = props; 
  function handleProductAddNewClick() {
    setAdminView("add");
  }
  function handleEditButtonClick(product) {
    
    setAdminView("edit");
    setSelectedProduct(product); 
  }

  function handleDeleteButtonClick(product) {
    props.onHandleDeletebutton(product);
  }

  return (
    <>
      {adminView == "list" && (
        <div className="text-center text-danger w-25 admin text">
          <a href="#" onClick={handleProductAddNewClick}>
            Add new Product!
          </a>
        </div>
      )}
      {(AdminView === "add" || AdminView === "edit") && (
        <AdminProductForm
          selectedProduct={selectedProduct}
          adminView={adminView}
        />
      )}

      {AdminView === "list" &&
        filterdProductList.map((product, index) => (
          <AdminProduct
            key={index}
            product={product}
            onHandleEditbutton={handleEditButtonClick}
            onHandleDeletebutton={handleDeleteButtonClick}
            // ondeleteformclick={handleDeleteButtonClick}
          />
        ))}
    </>
  );
}
