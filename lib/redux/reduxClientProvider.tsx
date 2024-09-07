"use client";

import { Provider } from "react-redux";
import store from "@/lib/redux/store";

export default function ReduxClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
