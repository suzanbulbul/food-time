import React, { useState } from "react";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

//API
import { CompanyApi } from "../../api/company";

//Library
import dayjs from "dayjs";

//Components
import { Table, Button, Modal, Loading } from "../../components/index";
import AddEditModal from "./addEditModal";

//Icons
import { MdDeleteOutline } from "react-icons/md";
import { PaginationData } from "../../util/type/data.type";
import { CampanyData } from "./company.type";

const Companies = () => {
  const [addCompany, setAddCompany] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<string>("");
  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false);
  const [removeModal, setRemoveModal] = useState<any>({});

  const { isFetching, data, refetch } = useQuery<PaginationData<CampanyData>>({
    queryKey: ["company"],
    queryFn: async () => {
      try {
        const response = await CompanyApi.getData();
        return response?.data;
      } catch (error) {
        throw new Error("Failed to fetch company data");
      }
    },
  });

  const columns = [
    {
      title: "Name",
      cell: (row: any) => (
        <Link
          href="/user-information"
          className="font-bold hover:text-indigo-500"
        >
          {row.name ? row.name : "-"}
        </Link>
      ),
    },
    {
      title: "Email",
      cell: (row: any) => <span>{row.email ? row.email : "-"}</span>,
    },
    {
      title: "Owner",
      cell: (row: any) => <span> {row.owner ? row.owner : "-"}</span>,
    },
    {
      title: "Mobile Number",
      cell: (row: any) => (
        <span>{row.mobile_number ? row.mobile_number : "-"}</span>
      ),
    },
    {
      title: "Dail Number",
      cell: (row: any) => (
        <span>{row.dail_number ? row.dail_number : "-"}</span>
      ),
    },
    {
      title: "Create Date",
      cell: (row: any) => (
        <span>{dayjs(row.createdAt).format("DD MMM YYYY - hh:mm")}</span>
      ),
    },
    {
      title: "Last Update",
      cell: (row: any) => (
        <span>{dayjs(row.updatedAt).format("DD MMM YYYY - hh:mm")}</span>
      ),
    },
  ];

  const tableAction = [
    {
      text: "Edit",
      onClick: (rowData: any) => {
        setEditModal(rowData.company_id);
        setAddCompany(true);
      },
    },
    {
      text: "Delete",
      onClick: (rowData: any) => {
        setRemoveModal(rowData);
        setRemoveModalOpen(true);
      },
    },
  ];

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <Button onClick={() => setAddCompany(true)} className="ml-auto">
          Add New Company
        </Button>

        <Table data={data as any} columns={columns} tableAction={tableAction} />
      </div>

      <Modal
        show={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onSave={() =>
          removeModal &&
          CompanyApi.deleteCompany(removeModal.company_id).then((res: any) => {
            if (!res?.error) {
              refetch();
              setRemoveModalOpen(false);
            }
          })
        }
        icon={<MdDeleteOutline />}
        title={"Delete Company"}
        desc={"Delete Company Desc"}
        saveTitle="Remove"
        variant="ERROR"
      >
        <p>{removeModal.name} are you sure you want to remove?</p>
      </Modal>

      <AddEditModal
        itemId={editModal}
        setItemId={setEditModal}
        show={addCompany}
        onClose={() => setAddCompany(false)}
        refetch={refetch}
      />
    </>
  );
};

export default Companies;