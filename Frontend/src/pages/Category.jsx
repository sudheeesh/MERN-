import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get(`/category/${id}`);
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">{id}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-2 rounded-md">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <h2 className="mt-2 font-semibold">{p.name}</h2>
            <p className="text-gray-500">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
