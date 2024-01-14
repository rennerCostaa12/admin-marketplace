export interface SalesProps {
  id: string;
  change_money: number;
  installments: number | null;
  list_products: string;
  total: number;
  created_at: string;
  updated_at: string;
  status: {
    name: string;
  };
  client: {
    id: string;
    username: string;
  };
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
