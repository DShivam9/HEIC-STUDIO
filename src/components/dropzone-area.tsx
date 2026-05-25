"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertCircle } from "lucide-react";
import ConversionList from "./conversion-list";
import { convertHeic, type ConversionJob, type OutputFormat } from "@/lib/heic-converter";

export default function DropzoneArea() {
  const [jobs, setJobs] = useState<ConversionJob[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("jpeg");

  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: any[]) => {
    setErrorMsg(null);
    if (fileRejections.length > 0) {
      if (fileRejections[0].errors.some((e: any) => e.code === "too-many-files")) {
        setErrorMsg("You can only convert up to 10 files at once to maintain performance.");
      } else {
        setErrorMsg("Some files were rejected. Please ensure they are HEIC format.");
      }
      return;
    }

    if (acceptedFiles.length === 0) return;

    const newJobs = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: "pending" as const,
      targetFormat: outputFormat,
    }));
    
    setJobs((prev) => [...prev, ...newJobs]);

    // Simple queue: Process all since we limited it to 10 max
    for (const job of newJobs) {
      setJobs((current) =>
        current.map((j) =>
          j.id === job.id ? { ...j, status: "converting" } : j
        )
      );

      try {
        const url = await convertHeic(job.file, job.targetFormat);
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
  }, [outputFormat]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    maxFiles: 10,
    accept: {
      "image/heic": [".heic"],
      "image/heif": [".heif"],
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-destructive text-sm font-medium bg-destructive/10 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <AlertCircle className="size-4" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex bg-muted/60 p-1.5 rounded-2xl w-full max-w-[280px] mx-auto relative backdrop-blur-sm border border-border/30">
          {(["jpeg", "png", "webp"] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setOutputFormat(fmt)}
              className={`relative flex-1 py-2 text-sm font-semibold tracking-wide transition-colors ${
                outputFormat === fmt ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {outputFormat === fmt && (
                <motion.div
                  layoutId="active-format"
                  className="absolute inset-0 bg-background rounded-xl shadow-sm border border-border/50"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{fmt.toUpperCase()}</span>
            </button>
          ))}
        </div>
        
        <AnimatePresence>
          {outputFormat === "png" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-muted-foreground text-center overflow-hidden"
            >
              <div className="pt-2">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-1.5 inline-block text-[0.65rem] uppercase tracking-wider font-bold">Note</span>
                PNG files are significantly larger than JPG or WEBP.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div layout className="w-full">
        <div
          {...getRootProps()}
          data-cursor="DROP"
          className={`
            relative w-full max-w-xl mx-auto p-6 md:p-8 flex flex-col items-center justify-center
            border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ease-out
            ${isDragActive ? "border-foreground bg-foreground/5 scale-[1.02]" : "border-border hover:border-foreground/50 hover:bg-muted/50"}
            ${isDragReject ? "border-destructive bg-destructive/10" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4 text-center pointer-events-none">
              <motion.div 
                layout
                className="p-4 rounded-full bg-foreground text-background pointer-events-auto shadow-sm group-hover:scale-110 group-hover:bg-primary transition-all duration-300"
              >
                {isDragReject ? (
                  <AlertCircle className="size-8 group-hover:text-primary-foreground" />
                ) : (
                  <Upload className="size-8 group-hover:text-primary-foreground" />
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
                Up to 10 files at once. 100% local processing.
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
