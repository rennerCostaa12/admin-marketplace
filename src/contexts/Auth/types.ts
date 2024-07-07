import { ReactNode } from "react";

export interface DatasUserProps {
  id: string;
  username: string;
  email: string;
  profile_img: string | null;
}

export interface ContextAuthProps {
  signIn: (email: string, password: string) => Promise<SignInReturnProps>;
  signOut: () => void;
  datasUser: DatasUserProps | undefined;
}

export interface SignInReturnProps {
  status: boolean;
  message: any;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
