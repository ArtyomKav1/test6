export type companiesGetType = {
  businessEntity: string;
  contactId: string;
  contract: {
    no: string;
    issue_date: string;
  };
  createdAt: string;
  id: string;
  name: string;
  photos: Array<PhotosType>;
  shortName: string;
  status: string;
  type: string[];
  updatedAt: string;
};

export type contactsGetType = {
  createdAt: string;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  phone: string;
  updatedAt: string;
};
export type authDelete = {};
export type companiesImagePostType = {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
};
export type contactsPatchType = {};
export type contactsPatchBodyType = {
  lastname?: string;
  firstname?: string;
  phone?: string;
  email?: string;
};
export type companyPatchBodyType = {
  name?: string;
  shortName?: string;
  businessEntity?: string;
  contract?: {
    no?: string;
    issue_date?: string;
  };
  type?: Array<string>;
};

export type PhotosType = {
  createdAt: string;
  filepath: string;
  name: string;
  thumbpath: string;
};

export type AuthType = {
  config: any;
  data: string;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};
