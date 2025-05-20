import axios, { AxiosResponse } from "axios";
import {
  authDelete,
  AuthType,
  companiesGetType,
  companiesImagePostType,
  companyPatchBodyType,
  contactsGetType,
  contactsPatchBodyType,
} from "./typeApi";

const key = localStorage.getItem("token");

export const API = {
  async authGET(): Promise<AxiosResponse<AuthType>> {
    return await axios.get(
      `https://test-task-api.allfuneral.com/auth?user=USERNAME`,
    );
  },
  async companiesGet(): Promise<AxiosResponse<companiesGetType>> {
    return await axios.get(
      `https://test-task-api.allfuneral.com/companies/12`,
      {
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
      },
    );
  },
  async companiesPatch(
    body: companyPatchBodyType,
  ): Promise<AxiosResponse<companiesGetType>> {
    return await axios.patch(
      `https://test-task-api.allfuneral.com/companies/12`,
      body,
      {
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
      },
    );
  },
  async companiesDelete(): Promise<AxiosResponse<authDelete>> {
    return await axios.delete(
      `https://test-task-api.allfuneral.com/companies/12`,
    );
  },
  async companiesImagePost(
    file: File,
  ): Promise<AxiosResponse<companiesImagePostType>> {
    if (!file) throw new Error("No file provided");
    const formData = new FormData();
    formData.append("file", file);
    return await axios.post(
      `https://test-task-api.allfuneral.com/companies/12/image`,
      formData,
      {
        headers: {
          Authorization: key,
        },
      },
    );
  },
  async companiesImageDelete(name: string): Promise<AxiosResponse<authDelete>> {
    return await axios.delete(
      `https://test-task-api.allfuneral.com/companies/12/image/${name}`,
      { headers: { Authorization: key } },
    );
  },
  async contactsGet(): Promise<AxiosResponse<contactsGetType>> {
    return await axios.get(`https://test-task-api.allfuneral.com/contacts/16`, {
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
    });
  },
  async contactsPatch(
    body: contactsPatchBodyType,
  ): Promise<AxiosResponse<contactsGetType>> {
    return await axios.patch(
      `https://test-task-api.allfuneral.com/contacts/16`,
      body,
      {
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
      },
    );
  },
};
