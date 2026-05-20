"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertCircle } from "lucide-react";
import ConversionList from "./conversion-list";
import { convertHeicToJpg, type ConversionJob } from "@/lib/heic-converter";

export default function DropzoneArea() {
  const [jobs, setJobs] = useState<ConversionJob[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newJobs = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: "pending" as const,
    }));
    
    setJobs((prev) => [...prev, ...newJobs]);

    for (const job of newJobs) {
      setJobs((current) =>
        current.map((j) =>
          j.id === job.id ? { ...j, status: "converting" } : j
        )
      );

      try {
        const url = await convertHeicToJpg(job.file);
        setJobs((current) =>
          current.map((j) =>
            j.id === job.id ? { ...j, status: "completed", resultUrl: url } : j
          )
        );
      } catch (error) {
        console.error(error);
        setJobs((current) =>
          current.map((j) =>
            j.id === job.id ? { ...j, status: "error", error: "Failed to convert" } : j
          )
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/heic": [".heic"],
      "image/heif": [".heif"],
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <motion.div
        layout
        className="w-full"
      >
        <div
          {...getRootProps()}
          className={`
            relative w-full max-w-2xl mx-auto p-12 md:p-20 flex flex-col items-center justify-center
            border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ease-out
            ${isDragActive ? "border-foreground bg-foreground/5 scale-[1.02]" : "border-border hover:border-foreground/50 hover:bg-muted/50"}
            ${isDragReject ? "border-destructive bg-destructive/10" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4 text-center pointer-events-none">
            <motion.div 
              layout
              className="p-4 rounded-full bg-muted text-foreground"
            >
              {isDragReject ? (
                <AlertCircle className="size-8" />
              ) : (
                <Upload className="size-8" />
              )}
            </motion.div>
            <div className="space-y-1">
              <p className="text-xl font-semibold">
                {isDragActive
                  ? isDragReject
                    ? "Only HEIC files are allowed!"
                    : "Drop it like it's hot..."
                  : "Click or drag HEIC files here"}
              </p>
              <p className="text-sm text-muted-foreground">
                Up to 50MB per file. 100% local processing.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto"
          >
            <ConversionList jobs={jobs} setJobs={setJobs} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
