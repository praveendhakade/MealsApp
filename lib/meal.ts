import { IMeal, IShareMeal } from "@/models/meals/Meal";
import { Collection, MongoClient } from "mongodb";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export class MealService {
  private uri: string | undefined;
  private client: MongoClient;

  constructor() {
    this.uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    if (!this.uri) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }
    this.client = new MongoClient(this.uri);
  }

  private async connectToDatabase() {
    try {
      await this.client.connect();
      return this.client.db("mealsDB");
    } catch (err) {
      console.error("Failed to connect to the database:", err);
      throw new Error("Database connection failed");
    }
  }

  public async getMeals(): Promise<IMeal[]> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    //   throw new Error('Couldn"t fetch');

    try {
      const db = await this.connectToDatabase();
      const collection: Collection<IMeal> = db.collection<IMeal>("meals");
      const allMeals: IMeal[] = await collection
        .find({})
        .sort({ title: 1 })
        .toArray();
      return allMeals;
    } catch (err) {
      console.error(err);
      await this.client.close();
      return [];
    } finally {
    }
  }

  public async getMeal(slug: string): Promise<IMeal | null> {
    try {
      const db = await this.connectToDatabase();

      const collection: Collection<IMeal> = db.collection<IMeal>("meals");
      const meal: IMeal | null = await collection.findOne({ slug: slug });
      return meal;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      // await this.client.close();
    }
  }

  public async saveMeal(meal: IShareMeal) {
    try {
      const db = await this.connectToDatabase();
      meal.slug = slugify(meal.title, { lower: true });
      meal.instructions = xss(meal.instructions);

      const extention = meal.image.name.split(".").pop();
      const fileName = `${meal.slug}.${extention}`;
      const stream = fs.createWriteStream(`public/images/${fileName}`);
      const bufferedImage = await meal.image.arrayBuffer();
      stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
          throw new Error("Saving image failed!");
        }
      });
      const mealToShare: Omit<IMeal, "_id"> = {
        ...meal,
        image: `/images/${fileName}`,
      };

      const collection: Collection = db.collection("meals");
      const savedMeal = await collection.insertOne(mealToShare);
      if (savedMeal.acknowledged) {
        return mealToShare;
      } else {
        throw new Error("Failed to save meal");
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export const mealsService = new MealService();
