import React from "react";


const VariantSelector = ({ variants, selectedVariants, handleVariantChange }) => {


  return (
    <div>
      {variants?.map((variant) => (
        <div key={variant.name} className="mb-4">
          <div className="font-semibold text-gray-800 mb-1">{variant.name}</div>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selectedVariants[variant.name] === option;
              return (
                <button
                  key={option}
                  onClick={() => handleVariantChange(variant.name, option)}
                  className={`px-4 py-2 rounded-full border ${
                    isSelected
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300'
                  } hover:shadow`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;