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
  show,
  onClose,
  refetch,
}: {
  itemId?: string;
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

  const onSubmit = async (formData: any) => {
    try {
      const res = itemId
        ? await ContractApi.updateContract(formData)
        : await ContractApi.createContract(formData);

      if (res && !res.data.error) {
        refetch();
        onClose();
        reset();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    itemId &&
      ContractApi.getDetail(itemId).then((res: any) => {
        if (!res.error) {
          reset(res);
        }
      });
  }, [itemId, reset]);

  return (
    <Modal
      show={show}
      onClose={() => {
        onClose();
        reset();
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
        <div className="w-full">
          <Input
            label="Owner*"
            type="text"
            placeholder="Enter Owner"
            {...register("owner", {
              required: "Please enter an owner",
            })}
            hasError={!!errors.owner}
            errorMessage={errors.owner?.message as any}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModal;
