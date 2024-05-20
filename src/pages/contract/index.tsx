import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

//API
import { ContractApi } from "../../api/contact";

//Library
import dayjs from "dayjs";

//Components
import { Button, Loading, Modal, Table } from "../../components/index";
import AddEditModal from "./addEditModal";

//Icons
import { MdDeleteOutline } from "react-icons/md";
import { IoMdCloudDownload } from "react-icons/io";

const Contract = () => {
  const [addContract, setAddContract] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<string>("");
  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false);
  const [removeModal, setRemoveModal] = useState<any>({});

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: () => ContractApi.getData(),
  });

  const columns = [
    {
      title: "Name",
      cell: (row: any) => <span>{row.name ? row.name : "-"}</span>,
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
    {
      title: "Start Date",
      cell: (row: any) => (
        <span>{dayjs(row.started_at).format("DD MMM YYYY - hh:mm")}</span>
      ),
    },
    {
      title: "End Date",
      cell: (row: any) => (
        <span>{dayjs(row.ended_at).format("DD MMM YYYY - hh:mm")}</span>
      ),
    },
    {
      title: "Payment Method",
      cell: (row: any) => (
        <span> {row.payment_method ? row.payment_method : "-"}</span>
      ),
    },
    {
      title: "Price",
      cell: (row: any) => <span>{row.price ? row.price : "-"}</span>,
    },
    {
      title: "Status",
      cell: (row: any) => <span>{row.status ? row.status : "-"}</span>,
    },
    {
      title: "",
      cell: (row: any) => (
        <button>
          <IoMdCloudDownload className="text-orange-500" />
        </button>
      ),
      className: "min-w-fit",
    },
  ];

  const tableAction = [
    {
      text: "Edit",
      onClick: (rowData: any) => {
        setEditModal(rowData.id);
        setAddContract(true);
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
        <Button onClick={() => setAddContract(true)} className="ml-auto">
          Add New Contract
        </Button>
        <div className="flex flex-col gap-6">
          <Table data={data} columns={columns} tableAction={tableAction} />
        </div>
      </div>

      <Modal
        show={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onSave={() =>
          removeModal &&
          ContractApi.deleteContract(removeModal.id).then((res: any) => {
            if (!res.error) {
              refetch();
              setRemoveModalOpen(false);
            }
          })
        }
        icon={<MdDeleteOutline />}
        title={"Delete Contract"}
        desc={"Delete Contract Desc"}
        saveTitle="Remove"
        variant="ERROR"
      >
        <p>{removeModal.name} are you sure you want to remove?</p>
      </Modal>

      <AddEditModal
        itemId={editModal}
        show={addContract}
        onClose={() => setAddContract(false)}
        refetch={refetch}
      />
    </>
  );
};

export default Contract;
