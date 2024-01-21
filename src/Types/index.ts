export interface StatusSalesProps {
  name: string;
}

export interface DeliverySalesProps {
  name: string;
}

export interface ClientSalesProps {
  id: string;
  username: string;
  listDevicesToken: string[];
  address: string;
  complement_address: string;
  number_address: number;
}

export interface SalesProps {
  id: string;
  change_money: number;
  installments: number | null;
  list_products: string;
  total: number;
  created_at: string;
  updated_at: string;
  status: StatusSalesProps;
  client: ClientSalesProps;
  delivery: DeliverySalesProps;
}

export interface MetaPaginationProps {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface SalesPaginationProps {
  items: SalesProps[];
  meta: MetaPaginationProps;
}

export interface ClientsProps {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  profile_img: string;
  address: string;
  number_address: number;
  complement_address: string;
  created_at: string;
  updated_at: string;
}

export interface OptionsSelectSearchProps {
  value: string;
  label: string;
}

export interface SalesProductsProps {
  id: string;
  nameItem: string;
  priceItem: number;
  quantity: number;
  typeItem: string;
  urlImg: string;
}
