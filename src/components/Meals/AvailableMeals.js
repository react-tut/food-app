import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const loadedMeals = [];
      try {
        const response = await fetch(
          "https://react-movie-app-c7967-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const data = await response.json();

        if (data) {
          for (const key in data) {
            loadedMeals.push({
              id: key,
              name: data[key].name,
              description: data[key].description,
              price: data[key].price,
            });
          }
        }
      } catch (ex) {
        setHttpError(ex.message);
      }
      setIsLoading(false);
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <p> Loading... </p>;
  if (httpError) {
    content = <p> {httpError} </p>;
  } else if (!isLoading && meals.length === 0) {
    content = <p> No Meals </p>;
  } else if (!isLoading && meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
