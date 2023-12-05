"use client";

import Loading from "@/app/loading";
import { USER_ROLE } from "@/enum/user/user.interface";
import useDealer from "@/hooks/useDealer";
import useStore from "@/hooks/useStore";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const withAuth = <T extends Props>(Component: React.ComponentType<T>, role = USER_ROLE.BUYER) => {
  const ComponentWithAuth = (props: Omit<T, keyof Props>) => {
    const router = useRouter();

    const { data: isAuthenticated, loading } = useStore<TWeb3Store, boolean>(
      useWeb3Store,
      (state) => state.isAuthenticated
    );

    const { isDealer } = useDealer(); 

    React.useEffect(() => {
      if (!loading && !isAuthenticated) {
        return router.replace("/unauthorized");
      }
      if (!loading && isAuthenticated && role === USER_ROLE.BUYER && isDealer) {
        return router.back();
      }
    }, [isAuthenticated, isDealer, loading, router]);

    if (loading) {
      return <Loading className="text-black" />;
    }

    return <Component {...(props as T)} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
