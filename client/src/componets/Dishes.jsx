import Loading from "./Loading";
import DisheCard from "./DisheCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setFilterFoods } from "../store/reducers/FoodSlice";

const Dishes = () => {
  const dispatch = useDispatch();
  const { foods, filteredFoods, filter, loading } = useSelector(
    (state) => state.foods
  );

  useEffect(() => {
    if (!foods || loading) return;
    if (filter === "") {
      const newFood = foods.slice(0, 8);
      dispatch(setFilterFoods(newFood));
    } else {
      const newFood = foods.filter((f) => f.category === filter);
      dispatch(setFilterFoods(newFood));
    }
  }, [filter, foods, loading]);

  useEffect(() => {
    dispatch(clearFilter());
  }, []);

  return foods && !loading ? (
    <div className="pb-10">
      <h1 className="text-4xl text-gray-800">Top dishes near you</h1>
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {filteredFoods.map((dishe) => {
          return <DisheCard key={dishe.id} dishe={dishe} />;
        })}
      </div>
    </div>
  ) : (
    <Loading size={20} />
  );
};

export default Dishes;
