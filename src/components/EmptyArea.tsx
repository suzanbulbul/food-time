import React from "react";
import router from "next/router";
import { useDispatch } from "react-redux";
import Image from "next/image";

//Redux
import { clearRecipeDetail } from "../redux/Slice/recipeSlice";

// Components
import { Button } from ".";

interface PropsType {
  title?: string;
  buttonTitle?: string;
  onClick?: () => void;
}

const EmptyArea = ({ title, buttonTitle, onClick }: PropsType) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="flex flex-col items-center gap-3">
        <Image
          className="h-full w-60 rounded-lg object-cover"
          src="/img/empty-img.png"
          alt="detail-img"
          width={56}
          height={56}
        />
        <p className="font-base text-center text-2xl text-indigo-500">
          {title ? (
            title
          ) : (
            <>
              Burada henüz burada bir tarif yok. <br /> Eklemek ister misin?
            </>
          )}
        </p>
        <Button
          onClick={
            onClick
              ? onClick
              : () => {
                  dispatch(clearRecipeDetail()), router.push("/recipe/add");
                }
          }
        >
          {buttonTitle ? buttonTitle : "Tarifler"}
        </Button>
      </div>{" "}
    </div>
  );
};

export default EmptyArea;
