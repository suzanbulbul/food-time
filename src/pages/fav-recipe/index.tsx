import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { favoriteList, removeAllFavorite } from "../../redux/Slice/recipeSlice";

//Library
import toast from "react-hot-toast";

//Components
import { Button, Card, Loading, Modal } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";

//Icons
import { BsTrash3 as Delete } from "react-icons/bs";

const FavRecipe = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(favoriteList);
  const [clickRemove, setClickRemove] = useState<boolean>(false);

  const [favList, setFavList] = useState<RecipeType[]>([]);

  useEffect(() => {
    if (favList) {
      setFavList(favorites);
    }
  }, [favList]);

  if (!favList) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {favList.length > 0 && (
          <Button
            variant="error"
            onClick={() => setClickRemove(true)}
            className="ml-auto"
          >
            Hepsini Temizle
          </Button>
        )}

        <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2 xl:grid-cols-3">
          {favList.length > 0 ? (
            favorites?.map((res: any, i: any) => {
              return (
                <Card
                  key={i}
                  title={res.name}
                  desc={res.summary}
                  category={res.category}
                  img={res?.img || null}
                  url={`/home/${res.id}`}
                />
              );
            })
          ) : (
            <h1>Favorites Listesi Boş</h1>
          )}
        </div>
      </div>
      <Modal
        show={clickRemove}
        onClose={() => setClickRemove(false)}
        onSave={async () => {
          dispatch(removeAllFavorite());
          toast.success("Tüm favori tarifler başarıyla silindi.");
          setClickRemove(false);
        }}
        icon={<Delete className="h-5 w-5 text-red-500" />}
        title="Tüm Favori Tarifleri Sil"
        variant="ERROR"
        saveTitle="Eminim"
        closeTitle="Vazgeç"
      >
        <p>
          Tüm favori tariflerinizi silmek istediğinize emin misiniz? Bu işlem
          geri alınamaz.
        </p>
      </Modal>
    </>
  );
};

export default FavRecipe;
