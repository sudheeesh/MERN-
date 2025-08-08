import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

const SearchResultsPage = () => {
  const { keyword } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axiosInstance.get(`/products?keyword=${keyword}`);
        setResults(data.products);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [keyword]);

  return (
    <div className="p-4 mt-20">
      <h2 className="text-xl font-semibold mb-4">Search results for: "{keyword}"</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product) => (
            <div key={product._id} className="border p-4 rounded">
         <Link to={`/product/${product._id}`} >  <ProductCard  product={product}/> </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
