import React, { useRef, useState, useEffect } from "react";
import "./document-upload.scss";
import { uploadDocument, removeDocument } from "./document.service";
import type { User } from "../user";

type Props = {
  user: User;
};

const DocumentUpload: React.FC<Props> = ({ user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(user.document || null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setErrorMessage(null);

    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl(null);
    }
  };

  const clearPreview = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setStatus("❌ Unsupported file type");
      return;
    }

    setLoading(true);
    setProgress(0);
    setStatus("Uploading...");

    const progressSim = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressSim);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const url = await uploadDocument(user.id!, file);
      setStatus("✅ Upload successful");
      clearPreview();
      setDocumentUrl(url);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    } finally {
      setTimeout(() => {
        setProgress(100);
        setLoading(false);
      }, 1000);
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
    if (!documentUrl) return null;

    const isImage = /\.(jpg|jpeg)$/i.test(documentUrl);
    const isPDF = /\.pdf$/i.test(documentUrl);

    return (
      <div className="document card mt-6 relative">
        {isImage && <img src={documentUrl} alt="User document" className="w-full max-h-[500px] object-contain rounded-sm" />}
        {isPDF && (
          <object data={documentUrl} type="application/pdf" className="w-full h-[600px]">
            <p>
              Your browser does not support PDFs.{" "}
              <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Download PDF
              </a>
            </p>
          </object>
        )}
        {!isImage && !isPDF && <p className="text-sm text-gray-500">Unsupported file type</p>}

        <button
          onClick={handleRemoveDocument}
          className="absolute cursor-pointer bottom-1 right-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm">
          Remove
        </button>
      </div>
    );
  };

  return (
    <div className="uploader-container card mt-8">
      <h2 className="header text-2xl font-semibold">Permis Conduire</h2>

      <div className="uploader-document">
        {errorMessage && <div className="error">{errorMessage}</div>}

        <form onSubmit={handleUpload} className="form">
          <label htmlFor="file-input" className="full-container-label">
            <span className="choose-file">Choose Document</span>
          </label>
          <input ref={fileInputRef} id="file-input" type="file" accept=".pdf,image/jpeg" onChange={handleFileChange} hidden />

          <button type="submit" disabled={!file || loading} className="upload-btn">
            {loading ? "Updating..." : "Update"}
          </button>
        </form>

        {previewUrl && file && (
          <div className="preview-container">
            <div className="preview">
              {file.type === "application/pdf" ? (
                <object data={previewUrl} type="application/pdf" className="content">
                  <p>
                    PDF preview not supported.{" "}
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Download PDF
                    </a>
                  </p>
                </object>
              ) : (
                <img src={previewUrl} alt="Preview" className="content" />
              )}

              <button onClick={clearPreview} className="clear-preview-btn">
                X
              </button>
            </div>
          </div>
        )}

        {(progress > 0 || loading) && (
          <div className="progress-container progress-bar-full">
            <div className={`progress-bar ${progress === 100 ? "completed" : ""}`}>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              <span className="progress-text">{progress}%</span>
            </div>
          </div>
        )}

        {loading && <div className="processing">Processing...</div>}
      </div>

      {renderDocument()}
    </div>
  );
};

export default DocumentUpload;
