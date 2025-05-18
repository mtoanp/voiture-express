import { useState } from "react";
import { uploadDocument } from "./document.service";

const DocumentUpload = ({ userId }: { userId: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("Uploading...");
    try {
      await uploadDocument(userId, file);
      setStatus("Upload successful ✅");
    } catch (err) {
      setStatus("Upload failed ❌");
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept=".pdf,image/jpeg" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default DocumentUpload;
