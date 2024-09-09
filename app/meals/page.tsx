import { MealsGrid } from "@/components/meals/meals-grid";
import { mealsService } from "@/lib/meal";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Your meals",
};

async function Meals() {
  const meals = await mealsService.getMeals();
  return <MealsGrid meals={meals || []} />;
}

const MealsPage = () => {
  return (
    <>
      <header className="meals-header">
        <h1>
          Delicious meals, created <span className="highlight">by yoou</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className="meals-cta">
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main>
        <Suspense fallback={<p className="loading">fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
