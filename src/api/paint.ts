import config from "@/config";

const paintApi = `${config.host}/api/paint`;

export const createNewPaint = async (name: string, image: File, token: string) => {
  const formData = new FormData();
  formData.append("imageFile", image);
  formData.append("name", name);
  const res = await fetch(paintApi, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
  return {
    status: res.status,
    data: await res.json(),
  };
};

//get user paints
export const getPaintsByUser = async (token: string) => {
  const res = await fetch(`${paintApi}/by-user`, { headers: { Authorization: `Bearer ${token}` } });
  return {
    status: res.status,
    data: await res.json(),
  };
};

export const getPaintById = async (token: string, id: string) => {
  const res = await fetch(`${paintApi}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return { status: res.status, data: await res.json() };
};
