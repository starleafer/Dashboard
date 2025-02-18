import { getServerSession } from "next-auth";
import { Providers } from "./Providers";

export async function SessionWrapper({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return <Providers session={session}>{children}</Providers>;
}       