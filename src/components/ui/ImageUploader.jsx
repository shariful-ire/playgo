"use client";

import { useState, useRef } from "react";
import { RiImageAddLine, RiCloseLine } from "react-icons/ri";

export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result);
      reader.readAsDataURL(file);
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 15, 90));
      }, 200);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      clearInterval(interval);

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setProgress(100);
      onChange(data.data.display_url);
    } catch {
      onChange("");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 500);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 btn btn-sm btn-circle bg-black/50 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <RiCloseLine className="text-lg" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-40 rounded-2xl border-2 border-dashed border-base-content/15 hover:border-primary/40 bg-base-200 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          {uploading ? (
            <>
              <span className="loading loading-spinner loading-md text-primary" />
              <div className="w-32 h-1.5 bg-base-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-base-content/40">{progress}%</span>
            </>
          ) : (
            <>
              <RiImageAddLine className="text-2xl text-base-content/30" />
              <span className="text-sm text-base-content/40">
                Click or drag an image here
              </span>
            </>
          )}
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
