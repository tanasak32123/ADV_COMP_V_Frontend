"use client";

import Loading from "@/app/loading";
import useStore from "@/hooks/useStore";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const withAuth = <T extends Props>(Component: React.ComponentType<T>) => {
  const ComponentWithAuth = (props: Omit<T, keyof Props>) => {
    const router = useRouter();

    const { data: isAuthenticated, loading } = useStore<TWeb3Store, boolean>(
      useWeb3Store,
      (state) => state.isAuthenticated
    );

    React.useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace("/unauthorized");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return <Loading className="text-black" />;
    }

    return <Component {...(props as T)} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
