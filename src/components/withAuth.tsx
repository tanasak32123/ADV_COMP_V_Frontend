'use client';

import Loading from "@/app/loading";
import useStore from "@/hooks/useStore";
import useWeb3Provider from "@/provider/useWeb3Provider";
import { IWeb3State, TWeb3Store, useWeb3Store } from "@/state/web3Store";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const withAuth = <T extends Props>(Component: React.ComponentType<T>) => {
  const ComponentWithAuth = (props: Omit<T, keyof Props>) => {
    const { loading } = useWeb3Provider();
    // const router = useRouter();

    const isAuthenticated = useStore<TWeb3Store, boolean>(useWeb3Store, (state) => state.isAuthenticated);

    // React.useEffect(() => {
    //   const isAuthenticated = localStorage.getItem("isAuthenticated") === 'true';
    //   if (!isAuthenticated) {
    //     router.replace("/unauthorized");
    //   }
    // }, [router]);

    console.log(isAuthenticated);
    console.log(loading);

    if (loading) {
      return <Loading />;
    }

    return <Component {...(props as T)} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
