import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../store/reducers/FoodSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { menu, filter } = useSelector((state) => state.foods);

  return (
    <div className="py-10">
      <h1 className="text-4xl text-gray-800">Explore our menu</h1>
      <p className="lg:w-2/3 w-full mt-4 text-sm text-gray-500">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="mt-5 overflow-x-scroll flex justify-between gap-6 h-36 px-2 border-b border-gray-200">
        {menu.map((item, index) => {
          if (item.menu_name === "Select all") return;
          return (
            <div
              onClick={() => dispatch(selectFilter(item.menu_name))}
              key={index}
              className="flex flex-col items-center gap-2 shrink-0"
            >
              <img
                className={`${
                  filter === item.menu_name &&
                  "border-2 border-orange-500 rounded-full shadow"
                } w-24 h-24 rounded-full cursor-pointer`}
                src={item.menu_image}
                alt=""
              />
              <p className="text-sm text-gray-500">{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
