import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

//Library
import dayjs from "dayjs";

//Components
import { Modal, Table, WhiteBox } from "../../components";

//Icons
import { TbWorld } from "react-icons/tb";
import { AiOutlineAppstore } from "react-icons/ai";
import { PiBellRinging } from "react-icons/pi";
import Button from "../../components/Button";
import { CompanyApi } from "../../api/company";
import { IoCreateOutline } from "react-icons/io5";

const Companies = () => {
  const [openSettingMenu, setOpenSettingMenu] = useState<boolean>(false);
  const [addProduct, setAddProduct] = useState<boolean>(false);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: () => CompanyApi.getData(),
  });

  const settingData = [
    {
      label: "Your Profile",
      url: "/profile",
    },
    {
      label: "Settings",
      url: "/setting",
    },
    {
      label: "Sign out",
      url: "/",
    },
  ];

  const columns = [
    {
      title: "Name",
      cell: (row: any) => (
        <Link
          href="/user-information"
          className="font-bold hover:text-indigo-500"
        >
          {row.name}
        </Link>
      ),
    },
    {
      title: "Email",
      cell: (row: any) => <span>{row.email}</span>,
    },
    {
      title: "Owner",
      cell: (row: any) => <span>{row.owner}</span>,
    },
    {
      title: "Mobile Number",
      cell: (row: any) => <span>{row.phone}</span>,
    },
    {
      title: "Create Date",
      cell: (row: any) => (
        <span>{dayjs(row.createdAt).format("DD.MM.YYYY")}</span>
      ),
    },
    {
      title: "Last Update",
      cell: (row: any) => (
        <span>{dayjs(row.updatedAt).format("DD.MM.YYYY")}</span>
      ),
    },
  ];

  const data2 = [
    {
      name: "Ah-Jin",
      email: "e@g.co",
      owner: "Enes",
      phone: "5355055555",
      createdAt: "2024-05-13T13:45:09.549143Z",
      updatedAt: "2024-05-14T00:00:00.468625Z",
    },
  ];

  const tableAction = [
    {
      text: "Edit",
      onClick: () => console.log("Test"),
    },
    {
      text: "Delete",
      onClick: () => console.log("Test"),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <WhiteBox>
        <nav className="flex justify-between items-center">
          <input type="text" placeholder="Search" />
          <div className="grid ggrid-rows-4 grid-flow-col gap-5 items-center">
            <Link href="#" className="row-span-1">
              <TbWorld className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
            </Link>
            <Link href="#" className="row-span-1">
              <AiOutlineAppstore className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
            </Link>

            <Link href="#" className="row-span-1">
              <PiBellRinging className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
            </Link>

            <div className="row-span-1 relative">
              <div className="">
                <div>
                  <button
                    onClick={() => setOpenSettingMenu(!openSettingMenu)}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  >
                    <Image
                      width={32}
                      height={32}
                      className="rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
                {openSettingMenu && (
                  <div
                    className="absolute right-0 top-14 z-10 w-44 rounded-lg bg-white shadow-lg"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {settingData.map((item, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="block text-center px-4 py-2 text-sm font-normal text-gray-600 hover:text-indigo-600 hover:bg-indigo-100"
                        role="menuitem"
                        tabIndex={-1}
                        id={`user-menu-item-${index}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </WhiteBox>

      <Button onClick={() => setAddProduct(true)} className="ml-auto">
        Add New User
      </Button>
      <Modal
        show={addProduct}
        onClose={() => setAddProduct(false)}
        onSave={() => {}}
        icon={<IoCreateOutline />}
        title="Create Company"
        desc={"Test Modal"}
        closeTitle={"Close"}
        saveTitle={"Save"}
      >
        Create New User Desc
      </Modal>

      <Table data={data2} columns={columns} tableAction={tableAction} />
    </div>
  );
};

export default Companies;
