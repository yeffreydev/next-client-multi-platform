export interface IPaint {
  _id: string;
  owner: string;
  imageName: string;
  name: string;
  users: string[];
  public: boolean; //default true - any user can view this paint
  createdAt: Date;
  updatedAt: Date;
}
