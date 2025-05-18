const API_URL = import.meta.env.VITE_API_URL;

export async function uploadDocument(userId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/users/${userId}/upload-document`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
