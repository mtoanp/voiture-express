const API_URL = import.meta.env.VITE_API_URL;

export async function uploadDocument(userId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/users/${userId}/upload-document`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  return data.document; // assuming backend returns { document: string }
}

export async function removeDocument(userId: string) {
  const res = await fetch(`${API_URL}/users/${userId}/remove-document`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
    },
  });

  if (!res.ok) throw new Error("Remove document failed");
}
