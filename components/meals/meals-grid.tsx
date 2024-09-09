import { IMeal } from "@/models/meals/Meal";
import MealItem from "./meal-item";

export const MealsGrid = ({ meals }: { meals: IMeal[] }) => {
  return (
    <ul className="meals-grid">
      {meals.map((meal) => (
        <li key={meal._id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};
