import React, { useState } from "react";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

//API
import { CompanyApi } from "../../api/company";

//Library
import dayjs from "dayjs";

//Components
import { Table, Button, Modal } from "../../components/index";
import AddEditModal from "./addEditModal";

//Icons
import { MdDeleteOutline } from "react-icons/md";

const Companies = () => {
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<string>("");
  const [removeModal, setRemoveModal] = useState<any>({
    type: false,
    company: {
      name: "",
      email: "",
      owner: "",
      phone: 0,
      dailnumber: 0,
    },
  });

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: () => CompanyApi.getData(),
  });

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
      onClick: (row: any) => {
        setEditModal(row.id);
        setAddProduct(true);
      },
    },
    {
      text: "Delete",
      onClick: (row: any) => {
        setRemoveModal({
          type: true,
          company: row,
        });
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <Button onClick={() => setAddProduct(true)} className="ml-auto">
          Add New Company
        </Button>

        <Table data={data2} columns={columns} tableAction={tableAction} />
      </div>

      <Modal
        show={removeModal.type}
        onClose={() =>
          setRemoveModal({
            type: false,
          })
        }
        onSave={() =>
          removeModal.company &&
          CompanyApi.deleteCompany(removeModal.company).then((res: any) => {
            if (!res.error) {
              refetch();
              setRemoveModal({
                type: false,
                company: null,
              });
            }
          })
        }
        icon={<MdDeleteOutline />}
        title={"Delete Company"}
        desc={"Delete Company Desc"}
        saveTitle="Remove"
        variant="ERROR"
      >
        <p>Are you sure you want to remove?</p>
      </Modal>

      <AddEditModal
        itemId={editModal}
        shox={addProduct}
        onClose={() => setAddProduct(false)}
        refetch={refetch}
      />
    </>
  );
};

export default Companies;
