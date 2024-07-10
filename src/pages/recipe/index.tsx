import React, { useState } from "react";
import { Button } from "../../components";
import router from "next/router";

const Recipe = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <Button
          onClick={() => router.push("recipe/add-recipe")}
          className="ml-auto"
        >
          Add New Recipe
        </Button>
      </div>
    </div>
  );
};

export default Recipe;
