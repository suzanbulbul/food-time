import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

//API
import { CompanyApi } from "../../api/company";

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
        ? await CompanyApi.updateCompany(formData)
        : await CompanyApi.createCompany(formData);

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
      CompanyApi.getDetail(itemId).then((res: any) => {
        if (!res.error) {
          reset({
            name: res?.name,
            email: res?.email,
            owner: res?.owner,
            mobile_number: res?.phone,
            dail_number: res?.dail_number,
          });
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
      title={itemId ? "Update Company" : "Create Company"}
      desc={itemId ? "Update Company Modal" : "Create Company Modal"}
    >
      <form
        className="flex w-full flex-col gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <Input
            label="Name*"
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Please enter a name",
            })}
            hasError={!!errors.name}
            errorMessage={errors.name?.message as any}
          />
        </div>
        <div className="w-full">
          <Input
            label="Email*"
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Please enter an email",
            })}
            hasError={!!errors.email}
            errorMessage={errors.email?.message as any}
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
        <div className="flex gap-2">
          <div className="w-full">
            <Input
              label="Phone*"
              type="number"
              placeholder="Enter Phone"
              {...register("phone", {
                required: "Please enter a phone",
              })}
              hasError={!!errors.phone}
              errorMessage={errors.phone?.message as any}
            />
          </div>
          <div className="w-full">
            <Input
              label="Dial Phone"
              type="number"
              placeholder="Enter Dial Phone"
              {...register("dail_number")}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModal;
