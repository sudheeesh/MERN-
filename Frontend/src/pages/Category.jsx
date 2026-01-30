import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Assuming API endpoint handles slug or we need to pass generic category fetch
        // If backend expects ID, we might have a problem unless slug == id or we fetch by slug.
        // Assuming backend works with the slug or we adjust. 
        // Based on previous files, let's try using the slug as the identifier.
        const { data } = await axiosInstance.get(`/products?category=${slug}`);
        // Standard pattern often involves filtering products by category slug
        // Or if there is a specific endpoint: /category/:slug

        // Let's assume the previous code intended to use the 'id' (which was likely the slug in the URL)
        // If the backend route is actually /category/:id and expects an ID, we might need to look up ID from slug? 
        // But usually frontend slugs match backend slugs or names. 
        // Let's rely on /products?category=slug if /category/:id fails, or sticky with /category/slug if backend supports it.
        // The previous code had: axiosInstance.get(`/category/${id}`)
        // Let's assume the backend route is `/category/${slug}`

        // Wait, checking Header.jsx, it maps categories. 
        // Let's persist with the likely intended route but with correct param.
        const res = await axiosInstance.get(`/products?category=${slug}`); // Common pattern
        if (res.data.products) {
          setProducts(res.data.products);
        } else {
          // Fallback to previous endpoint style just in case
          const res2 = await axiosInstance.get(`/category/${slug}`);
          setProducts(res2.data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products for category", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProducts();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-4 pt-20 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold capitalize mb-6 text-gray-800">{slug?.replace("-", " ")}</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
