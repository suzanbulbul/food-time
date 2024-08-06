import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { GetServerSideProps } from "next";

//API
import { recipeApi } from "../../api/recipeApi";

//Redux
import { setRecipeDetail } from "../../redux/Slice/recipeSlice";

//Library
import toast from "react-hot-toast";

//Components
import {
  Loading,
  Button,
  DropDown,
  Modal,
  ProgressBar,
} from "../../components";

//Type
import { RecipeType, TabType } from "../../util/type/recipe.type";
import { DropdownAction } from "../../components/DropDown";

//Helper
import { aggregateIngredients, getCategoryByValue } from "../../util/helper";

//Icons
import { BsTrash3 as Delete } from "react-icons/bs";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const data = await recipeApi.getRecipeById(id);
    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } };
  }
};

const RecipeDetail = ({ data }: { data: RecipeType }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tab, setTab] = useState<TabType[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [clickRemove, setClickRemove] = useState<boolean>(false);

  const actions: DropdownAction[] = [
    {
      label: "Tarifi Düzenle",
      onClick: () => {
        router.push("add-edit");
      },
    },
    {
      label: "Tarifi Sil",
      onClick: async () => {
        setClickRemove(true);
      },
    },
  ];

  const handleStepChange = (increment: number) => {
    const newTab = currentTab + increment;
    if (newTab >= 0 && newTab < tab.length) {
      setCurrentTab(newTab);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setRecipeDetail(JSON.stringify(data)));

      const totalMinutes = data.step
        .map((step) => parseInt(step.time, 10))
        .reduce((total, time) => total + time, 0);

      const tabs = [
        {
          id: 0,
          minute: totalMinutes.toString(),
          name: data.name,
          summary: data.summary,
          materials: aggregateIngredients(data.step),
          img: data.img,
        },
        ...data.step.map((step, index) => ({
          id: index + 1,
          minute: step.time,
          name: step.name,
          summary: step.stepRecipe,
          materials: step.materials
            .split(",")
            .map((material) => material.trim()),
          time: step.materials,
          img: step.imageUrl,
        })),
      ];
      setTab(tabs);
    }
  }, [data, dispatch]);

  if (!data || tab.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-120px)] flex-col justify-between gap-4 overflow-hidden">
        <div className="flex flex-col gap-3">
          <ProgressBar currentStep={currentTab} totalSteps={tab.length - 1} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-200 px-3 py-1 text-sm font-semibold text-indigo-700">
                {getCategoryByValue(data.category)}
              </span>
              <span className="text-base text-indigo-700">
                {tab[currentTab].minute} dakika
              </span>
            </div>
            {tab[currentTab].id === 0 && (
              <DropDown title="Özellikler" actions={actions} />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-indigo-700">
              {tab[0].name}
              {currentTab !== 0 && ` -  ${tab[currentTab].name}`}
            </h1>
            <div className="flex flex-col items-start justify-start gap-4 sm:flex-row">
              {tab[currentTab].img && (
                <Image
                  className="h-32 w-[250px] rounded-lg object-cover"
                  src={
                    tab[currentTab].img ||
                    "https://v1.tailwindcss.com/img/card-top.jpg"
                  }
                  alt="detail-img"
                  width={250}
                  height={250}
                />
              )}
              <p className="text-base font-medium text-gray-700">
                {tab[currentTab].summary}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-base font-medium text-indigo-800">
              {tab[currentTab].id === 0
                ? "Tüm Malzemeleri"
                : `${tab[currentTab].name} İçin Gerekli Malzemeler`}
            </h1>
            <ul className="grid w-full grid-cols-2 gap-4 p-5">
              {tab[currentTab].materials.map((s, i) => (
                <li key={i}>
                  <p className="text-base font-medium capitalize text-gray-700">
                    {s}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {currentTab > 0 && (
            <Button
              variant="base"
              onClick={() => {
                handleStepChange(-1);
              }}
            >
              Önce Adım
            </Button>
          )}

          <Button
            onClick={() => {
              if (tab[currentTab]?.id === 0) {
                setCurrentTab(1);
              } else if (currentTab < tab.length - 1) {
                if (currentTab < tab.length - 1) {
                  setCurrentTab((prevTab) => prevTab + 1);
                }
              } else {
                router.push("/home");
              }
            }}
            variant="success"
            className="ml-auto"
          >
            {tab[currentTab].id === 0
              ? "Hemen Başla"
              : currentTab < tab.length - 1
              ? " Sonra Adım"
              : "Diğer Tarihlere Göz At"}
          </Button>
        </div>
      </div>
      <Modal
        show={clickRemove}
        onClose={() => setClickRemove(false)}
        onSave={async () => {
          await recipeApi.deleteRecipeById(router.query.toString());
          toast.success("Tarif başarıyla silindi.");
          router.push("/recipe");
        }}
        icon={<Delete className="h-5 w-5 text-red-500" />}
        title="Tarifi Sil"
        variant="ERROR"
        saveTitle="Kaydet"
        closeTitle="Vazgeç"
      >
        <p>
          {data.name} tarifini silmek istediğinizden emin misiniz? Bu işlem geri
          alınamaz.
        </p>
      </Modal>
    </>
  );
};

export default RecipeDetail;
