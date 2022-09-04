export interface ICategory extends Document {
  id?: string;
  name: string;
  description?: string;
  fatherCategory?: ICategory[];
  subCategorys?: ICategory[];
}
