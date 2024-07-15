import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { favoriteList, removeAllFavorite } from "../../redux/Slice/recipeSlice";

//Components
import { Button, Card, Loading } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";

const FavRecipe = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(favoriteList);

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
    <div className="flex flex-col gap-4">
      {favList.length > 0 && (
        <Button
          variant="error"
          onClick={() => dispatch(removeAllFavorite())}
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
  );
};

export default FavRecipe;
