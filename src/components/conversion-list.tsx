"use client";

import { motion } from "framer-motion";
import { type ConversionJob } from "@/lib/heic-converter";
import { FileImage, Loader2, AlertCircle, Download, X } from "lucide-react";
import { Button } from "./ui/button";

interface ConversionListProps {
  jobs: ConversionJob[];
  setJobs: React.Dispatch<React.SetStateAction<ConversionJob[]>>;
}

export default function ConversionList({ jobs, setJobs }: ConversionListProps) {
  const removeJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <motion.div
          key={job.id}
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
              <div className="flex items-center gap-2 text-primary">
                <Loader2 className="size-4 animate-spin" />
                <span className="text-xs font-medium">Converting...</span>
              </div>
            )}
            {job.status === "error" && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="size-4" />
                <span className="text-xs font-medium">Error</span>
              </div>
            )}
            {job.status === "completed" && job.resultUrl && (
              <Button asChild size="sm" variant="default" className="gap-2">
                <a href={job.resultUrl} download={`${job.file.name.replace(/\.heic$/i, "")}.jpg`}>
                  <Download className="size-4" />
                  Download
                </a>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              onClick={() => removeJob(job.id)}
            >
              <X className="size-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
