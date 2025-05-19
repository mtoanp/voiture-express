import { useState } from "react";
import { uploadDocument, removeDocument } from "./document.service"; // adjust paths
import type { User } from "../user"; // your User type

const DocumentUpload2 = ({ user }: { user: User }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(user.document || null);

  const handleUpload = async () => {
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setStatus("❌ Unsupported file type");
      return;
    }

    setStatus("Uploading...");
    try {
      const url = await uploadDocument(user.id!, file);
      setDocumentUrl(url);
      setStatus("✅ Upload successful");
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    }
  };

  const handleRemoveDocument = async () => {
    try {
      await removeDocument(user.id!);
      setDocumentUrl(null);
      setStatus("🗑️ Document removed");
    } catch (err) {
      console.error(err);
      setStatus("❌ Remove failed");
    }
  };

  const renderDocument = () => {
    console.log("documentUrl:", documentUrl); // 👀 Debug
    if (!documentUrl) return null;

    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(documentUrl);
    const isPDF = /\.pdf$/i.test(documentUrl);

    return (
      <div>
        <strong>Document</strong>
        <div className="mt-2 border rounded overflow-hidden w-full flex justify-center bg-gray-50 p-4 relative">
          {isImage && <img src={documentUrl} alt="User document" className="w-[80%] max-h-[500px] object-contain" />}
          {isPDF && (
            <object data={documentUrl} type="application/pdf" className="w-[80%] h-[600px] border">
              <p>
                Your browser does not support PDFs.{" "}
                <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Download PDF
                </a>
              </p>
            </object>
          )}
          {!isImage && !isPDF && <p className="text-sm text-gray-500">Unsupported file type</p>}

          <button onClick={handleRemoveDocument} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm">
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="upload-document card space-y-4 mt-8 pt-4">
      <h2 className="header text-2xl font-semibold mb-4">Document</h2>
      {renderDocument()}

      <div>
        <input type="file" accept=".pdf,image/jpeg" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block" />
        <button className="bg-blue-600 text-white px-4 py-1 rounded mt-2 disabled:opacity-50" onClick={handleUpload} disabled={!file}>
          Upload
        </button>
      </div>

      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default DocumentUpload2;
