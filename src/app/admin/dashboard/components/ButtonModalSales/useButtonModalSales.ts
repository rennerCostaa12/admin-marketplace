import { SalesProductsProps } from "@/Types";

export const useButtonModalSales = () => {
  const getTotalPrice = (listProducts: SalesProductsProps[]) => {
    const totalPrice = listProducts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.priceItem * currentValue.quantity;
    }, 0);

    return totalPrice;
  };

  return {
    getTotalPrice,
  };
};
