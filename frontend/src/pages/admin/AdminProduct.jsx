import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("");
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  let filteredproducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder === "loToHigh") {
    filteredproducts = [...filteredproducts].sort(
      (a, b) => a.productPrice - b.productPrice
    );
  } else if (sortOrder === "highToLow") {
    filteredproducts = [...filteredproducts].sort(
      (a, b) => b.productPrice - a.productPrice
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category);
    formData.append("brand", editProduct.brand);

    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => formData.append("files", file));

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/product/update/${editProduct._id}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success("Product updated");
        dispatch(
          setProducts(
            products.map((p) =>
              p._id === editProduct._id ? res.data.product : p
            )
          )
        );
        setOpen(false);
      }
    } catch {
      toast.error("Failed to update product");
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/product/delete/${productId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(products.filter((p) => p._id !== productId)));
      }
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="bg-white pr-10"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        <Select onValueChange={setSortOrder}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="loToHigh">Low to High</SelectItem>
              <SelectItem value="highToLow">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-4">
        {filteredproducts.map((product) => (
          <Card key={product._id} className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <img
                  src={product.productImg[0]?.url}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h1 className="font-semibold text-gray-800 line-clamp-2">
                    {product.productName}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {product.brand} • {product.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="font-semibold text-gray-900">
                  ₹{product.productPrice}
                </span>

                <div className="flex gap-3">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Edit
                        onClick={() => {
                          setEditProduct(product);
                          setOpen(true);
                        }}
                        className="text-green-600 cursor-pointer"
                      />
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Update product details and save changes.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-3">
                        <Label>Product Name</Label>
                        <Input
                          name="productName"
                          value={editProduct?.productName}
                          onChange={handleChange}
                        />

                        <Label>Price</Label>
                        <Input
                          type="number"
                          name="productPrice"
                          value={editProduct?.productPrice}
                          onChange={handleChange}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            name="brand"
                            value={editProduct?.brand}
                            onChange={handleChange}
                            placeholder="Brand"
                          />
                          <Input
                            name="category"
                            value={editProduct?.category}
                            onChange={handleChange}
                            placeholder="Category"
                          />
                        </div>

                        <Textarea
                          name="productDesc"
                          value={editProduct?.productDesc}
                          onChange={handleChange}
                        />

                        <ImageUpload
                          productData={editProduct}
                          setProductData={setEditProduct}
                        />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash2 className="text-red-600 cursor-pointer" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this product?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;
