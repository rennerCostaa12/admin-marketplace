export const revalidate = 3600;

import { TableDashboard } from "@/components/TableDashboard";
import ButtonUpdate from "@/components/ButtonUpdate";

import { Api } from "@/configs/Api";

import { ClientsProps } from "@/Types";

async function AllClientsDatas() {
  try {
    const response = await Api.get("clients/listClients");

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function Dashboard() {
  const allClients: ClientsProps[] = await AllClientsDatas();

  return (
    <main>
      <div className="m-4">
        <div className="w-auto mx-4 my-6 flex justify-end flex-end">
          <ButtonUpdate />
        </div>
        <TableDashboard allClients={allClients} />
      </div>
    </main>
  );
}
