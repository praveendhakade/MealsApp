export interface IMeal {
  _id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
}

export interface IShareMeal extends Omit<IMeal, "image" | "_id"> {
  image: File;
}
