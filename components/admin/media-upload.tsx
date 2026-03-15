"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

interface MediaUploadProps {
  onUploaded?: () => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function MediaUpload({ onUploaded }: MediaUploadProps) {
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveMedia = useMutation(api.media.saveMedia);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setErrorMessage("");
    setProgress(`Uploading ${file.name}...`);

    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.statusText}`);
      }

      const { storageId } = await result.json();

      await saveMedia({
        storageId,
        filename: file.name,
        mimeType: file.type,
        alt: "",
      });

      setStatus("success");
      setProgress(`${file.name} uploaded successfully.`);
      onUploaded?.();

      // Reset after a moment
      setTimeout(() => {
        setStatus("idle");
        setProgress("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 2500);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Upload failed. Please try again."
      );
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={status === "uploading"}
      />

      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={status === "uploading"}
      >
        <Upload className="h-4 w-4" />
        {status === "uploading" ? "Uploading..." : "Upload Image"}
      </Button>

      {status === "uploading" && progress && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          {progress}
        </p>
      )}

      {status === "success" && (
        <p className="text-xs text-green-600 flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          {progress}
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-600 flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}
