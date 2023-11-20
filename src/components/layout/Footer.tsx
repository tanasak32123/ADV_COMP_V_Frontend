import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-white text-black sm:flex justify-between px-6 py-3 hidden fixed bottom-0 items-center border-t border-black">
      <div className="flex items-center gap-x-3">
        <div className="text-xs sm:text-sm">contact us:</div>
        <Link href={`#facebook`}>
          <FaFacebook />
        </Link>
        <Link href={`#X`}>
          <FaXTwitter />
        </Link>
        <Link href={`#Instagram`}>
          <FaInstagram />
        </Link>
      </div>

      <div className="text-xs sm:text-sm">Developed by ธนานาศักดิ์ เกิลเฟรนssssss</div>
    </div>
  );
}
