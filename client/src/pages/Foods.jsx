import React, { useEffect } from "react";
import FilterIcon from "../Icons/FilterIcon";
import DisheCard from "../componets/DisheCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  selectFilter,
  setFilterFoods,
} from "../store/reducers/FoodSlice";

const Foods = () => {
  const dispatch = useDispatch();
  const { menu, filter, foods, filteredFoods, loading } = useSelector(
    (state) => state.foods
  );

  useEffect(() => {
    dispatch(clearFilter());
  }, []);

  useEffect(() => {
    if (!foods || loading) return;
    if (filter === "") {
      const newFood = foods;
      dispatch(setFilterFoods(newFood));
    } else {
      const newFood = foods.filter((f) => filter.includes(f.category));
      dispatch(setFilterFoods(newFood));
    }
  }, [filter]);

  return (
    <div className="min-h-screen">
      {/* All foods */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <h1 className="text-3xl font-bold text-orange-400">
            Explore our food
          </h1>
          {/* Filter */}
          <div className="mr-10 flex gap-1 items-center border border-orange-300 p-2 rounded-md text-gray-700 hover:bg-orange-100">
            <select
              onChange={(e) => dispatch(selectFilter(e.target.value))}
              className="outline-none"
            >
              {menu.map((m, index) => {
                return (
                  <option
                    key={index}
                    value={m.menu_name}
                    className="bg-orange-50"
                  >
                    {m.menu_name}
                  </option>
                );
              })}
            </select>
            <FilterIcon />
          </div>
        </div>
        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {filteredFoods.map((dishe) => {
            return <DisheCard key={dishe.id} dishe={dishe} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Foods;
