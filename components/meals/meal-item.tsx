import Link from "next/link";
import Image from "next/image";
import { IMeal } from "@/models/meals/Meal";

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: IMeal) {
  return (
    <article className="meal">
      <header>
        <div className="meal-image">
          <Image src={image} alt={title} fill />
        </div>
        <div className="headerText">
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className="content">
        <p className="summary">{summary}</p>
        <div className="actions">
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
