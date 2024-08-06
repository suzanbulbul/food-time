import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginHandle,
  settingClickHandle,
  settingsState,
} from "../redux/Slice/authSlice";
import toast from "react-hot-toast";

//Components
import { FileInput, Input, Modal } from "../components";

//Icons
import { CiSettings as Settings } from "react-icons/ci";

//Helpers
import { User } from "../util/type/user.type";

//Helpers
import { regex } from "../util/helper";

//API
import { authApi } from "../api/authApi";

export interface SettingsModalType {
  displayName: string;
  photoURL?: string | null;
}

const SettingsModal = ({ user }: { user: User }) => {
  const dispatch = useDispatch();
  const clickSettings = useSelector(settingsState);
  const [file, setFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SettingsModalType>({
    defaultValues: {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    },
  });

  const onSubmit = async (formData: SettingsModalType) => {
    await authApi.updateProfile(formData, file as any).then((res: any) => {
      if (res?.accessToken) {
        const formatData = {
          uid: res?.uid,
          email: res?.email,
          displayName: res?.displayName,
          photoURL: res?.photoURL,
        };
        toast.success("Ayarlar güncellendi.");
        dispatch(loginHandle(JSON.stringify(formatData)));
        onClose();
      } else {
        toast.error("Error updating profile");
      }
    });
  };

  const onClose = () => {
    dispatch(settingClickHandle(false));
    reset();
  };

  useEffect(() => {
    reset({
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    });
  }, [user, reset]);

  useEffect(() => {
    setSettings(clickSettings);
  }, [clickSettings]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Modal
      title="Ayarlar"
      show={settings}
      desc="Profil ayarlarınızı güncelleyin."
      icon={<Settings className="h-5 w-5" />}
      onClose={onClose}
      onSave={handleSubmit(onSubmit)}
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Input
            type="text"
            label="Name*"
            placeholder="Enter your name"
            {...register("displayName", {
              required: "Please enter your name",
              pattern: {
                message:
                  "Name should be between 2 and 12 characters and consist of A-Z letters.",
                value: regex.name,
              },
            })}
            hasError={!!errors.displayName}
            errorMessage={errors.displayName?.message}
          />
        </div>
        <div className="w-full">
          <FileInput
            fileName={getValues("photoURL") as any}
            placeholder="suzan"
            label="Profil Resmi"
            type="file"
            {...register("photoURL")}
            onChange={handleFileChange}
          />
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
