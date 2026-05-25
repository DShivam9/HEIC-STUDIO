"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type ConversionJob } from "@/lib/heic-converter";
import { FileImage, Loader2, AlertCircle, Download, X, CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { LiquidButton } from "./liquid-button";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ConversionListProps {
  jobs: ConversionJob[];
  setJobs: React.Dispatch<React.SetStateAction<ConversionJob[]>>;
}

function ConversionItem({ job, onRemove, hideDownload }: { job: ConversionJob; onRemove: (id: string) => void; hideDownload: boolean }) {
  // Auto-dismiss after 8 seconds for single-file mode only
  useEffect(() => {
    if (hideDownload) return; // multi-file: don't auto-dismiss, user will click "Download All"
    if (job.status === "completed" || job.status === "error") {
      const timer = setTimeout(() => {
        onRemove(job.id);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [job.status, job.id, onRemove, hideDownload]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="p-2 bg-muted rounded-lg shrink-0">
          <FileImage className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-medium truncate">{job.file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(job.file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-4">
        {job.status === "pending" && (
          <span className="text-xs font-medium text-muted-foreground">Waiting</span>
        )}
        {job.status === "converting" && (
          <div className="flex flex-col items-end gap-1.5 w-24">
            <span className="text-xs font-medium text-primary">Converting</span>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary" 
                initial={{ x: "-100%" }} 
                animate={{ x: "100%" }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} 
              />
            </div>
          </div>
        )}
        {job.status === "error" && (
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="size-4" />
            <span className="text-xs font-medium">Error</span>
          </div>
        )}
        {job.status === "completed" && job.resultUrl && (
          <>
            {hideDownload ? (
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="size-4" />
                <span className="text-xs font-medium">Done</span>
              </div>
            ) : (
              <LiquidButton
                asLink
                href={job.resultUrl} 
                download={`${job.file.name.replace(/\.heic$/i, "")}.${job.targetFormat === "jpeg" ? "jpg" : job.targetFormat}`}
                className="!py-1 !px-3 !rounded-[12px] !text-[0.8rem] h-7"
              >
                <Download className="size-3.5" />
                Download
              </LiquidButton>
            )}
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          onClick={() => onRemove(job.id)}
        >
          <X className="size-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </motion.div>
  );
}

export default function ConversionList({ jobs, setJobs }: ConversionListProps) {
  const [isZipping, setIsZipping] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);

  const removeJob = React.useCallback((id: string) => {
    setJobs((prev) => {
      const job = prev.find((j) => j.id === id);
      if (job?.resultUrl) {
        URL.revokeObjectURL(job.resultUrl);
      }
      return prev.filter((j) => j.id !== id);
    });
  }, [setJobs]);

  const handleDownloadAll = async () => {
    setIsZipping(true);
    setZipError(null);

    // Snapshot all completed blob URLs immediately before any timers can fire
    const completedJobs = jobs.filter((j) => j.status === "completed" && j.resultUrl);
    
    // Fetch ALL blobs in parallel so no timer can revoke a URL mid-flight
    const blobResults = await Promise.allSettled(
      completedJobs.map(async (job) => {
        const response = await fetch(job.resultUrl!);
        const blob = await response.blob();
        const ext = job.targetFormat === "jpeg" ? "jpg" : job.targetFormat;
        const fileName = `${job.file.name.replace(/\.heic$/i, "")}.${ext}`;
        return { fileName, blob };
      })
    );

    const zip = new JSZip();
    for (const result of blobResults) {
      if (result.status === "fulfilled") {
        zip.file(result.value.fileName, result.value.blob);
      }
    }

    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "converted-images.zip");
    } catch (err) {
      console.error("Zipping error:", err);
      setZipError("Failed to create ZIP file. Please download files individually.");
      setIsZipping(false);
      return; // Exit early so we don't clear jobs
    }

    // Clear all jobs after successful download
    setJobs((prev) => {
      prev.forEach((job) => {
        if (job.resultUrl) URL.revokeObjectURL(job.resultUrl);
      });
      return [];
    });

    setIsZipping(false);
  };

  useEffect(() => {
    // Cleanup URLs on unmount to prevent memory leaks
    return () => {
      jobs.forEach((job) => {
        if (job.resultUrl) {
          URL.revokeObjectURL(job.resultUrl);
        }
      });
    };
  }, [jobs]);

  const completedCount = jobs.filter(j => j.status === "completed").length;
  const totalCount = jobs.length;
  const isMultiFile = totalCount > 1;
  const allDone = totalCount > 0 && completedCount === totalCount;

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <ConversionItem 
          key={job.id} 
          job={job} 
          onRemove={removeJob} 
          hideDownload={isMultiFile}
        />
      ))}

      {isMultiFile && allDone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-end mt-2"
        >
          <LiquidButton 
            onClick={handleDownloadAll} 
            disabled={isZipping}
            className="w-full sm:w-auto mt-2"
            aria-label="Download all converted files as a ZIP archive"
            aria-busy={isZipping}
          >
            {isZipping ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Download className="size-4" aria-hidden="true" />}
            {isZipping ? "Zipping..." : `Download All (${completedCount})`}
          </LiquidButton>
          {zipError && (
            <p className="text-destructive text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="size-4" />
              {zipError}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
