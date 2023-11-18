import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useWeb3Provider from "@/provider/useWeb3Provider";
import { useWeb3Store } from "@/state/web3Store";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

export default function AccountDropdown() {
  const { disconnectWallet } = useWeb3Provider();
  const { address } = useWeb3Store();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="bg-[#36517C] border-white border-[1px] rounded-[40px] h-fit py-1 px-2 flex items-center">
        <div className="truncate max-w-[90px]">{address}</div>
        {isOpen ? <FaAngleDown /> : <FaAngleUp />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={disconnectWallet}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
