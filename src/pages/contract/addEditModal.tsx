import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

//API
import { ContractApi } from "../../api/contact";

//Components
import { Input, Modal } from "../../components/index";

//Icons
import { IoCreateOutline } from "react-icons/io5";

const AddEditModal = ({
  itemId,
  setItemId,
  show,
  onClose,
}: {
  itemId?: string;
  setItemId?: (id: string) => void;
  show: boolean;
  onClose: () => void;
  refetch: () => void;
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleClose = () => {
    onClose();
    setItemId && setItemId("");
    reset({});
  };

  console.log(itemId);

  const onSubmit = async (formData: any) => {
    itemId
      ? await ContractApi.updateContract(formData)
      : await ContractApi.createContract(formData);
  };

  useEffect(() => {
    itemId &&
      ContractApi.getDetail(itemId).then((res: any) => {
        if (!res?.error) {
          reset(res?.data);
        }
      });
  }, [itemId, reset]);

  return (
    <Modal
      show={show}
      onClose={() => {
        handleClose();
      }}
      onSave={handleSubmit(onSubmit)}
      icon={<IoCreateOutline />}
      title={itemId ? "Update Contract" : "Create Contract"}
      desc={itemId ? "Update Contract Modal" : "Create Contract Modal"}
    >
      <form
        className="flex w-full flex-col gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <Input
            label="Payment Method*"
            type="text"
            placeholder="Name"
            {...register("payment_method", {
              required: "Please enter a payment method",
            })}
            hasError={!!errors.payment_method}
            errorMessage={errors.payment_method?.message as any}
          />
        </div>
        <div className="w-full">
          <Input
            label="Price*"
            type="email"
            placeholder="price"
            {...register("price", {
              required: "Please enter a price",
            })}
            hasError={!!errors.price}
            errorMessage={errors.price?.message as any}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModal;
