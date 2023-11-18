"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { FaCircleDollarToSlot } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="pt-6 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center lg:pl-10 pe-0">
          <div className="text-white">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
              Welcome to ชื่อแอปไรสักอย่าง
            </h1>
            <p className="leading-7 text-xs mt-2">
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <Button className="bg-[#618FD8] font-bold mt-4 rounded-[25px] min-w-[120px]">
              Get Start
            </Button>

            <div className="bg-white w-full text-black mt-10 p-7 rounded-[30px]">
              <div className="w-full flex items-center">
                <div className="font-bold text-base border-b-2 border-black w-full me-5 py-2">
                  ผลสลากกินแบ่งรัฐบาล ประจำงวดที่ 1 มกราคม พ.ศ. 2555
                </div>
                <Button className="bg-[#7AA6EE] text-white rounded-[20px]">
                  ตรวจรางวัล
                </Button>
              </div>
              <div className="grid grid-cols-4 mt-6">
                <div className="flex flex-col">
                  <div className="font-semibold text-sm">รางวัล 1</div>
                  <div className="font-bold text-lg">123456</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold text-sm">เลขท้าย 3 ตัว</div>
                  <div className="font-bold text-lg">123, 456</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold text-sm">เลขหน้า 3 ตัว</div>
                  <div className="font-bold text-lg">123, 456</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold text-sm">เลขท้าย 2 ตัว</div>
                  <div className="font-bold text-lg">12</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pb-16 pt-12">
          <div className="w-[50%] h-auto bg-[#7AA7EE] lg:p-28 p-20 rounded-full">
            <FaCircleDollarToSlot className="w-full h-auto text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
