import { useRouter } from "next/navigation";

export const useButtonUpdate = () => {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  return {
    handleUpdate,
  };
};
