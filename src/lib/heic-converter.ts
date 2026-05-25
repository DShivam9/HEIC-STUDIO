export type ConversionStatus = "pending" | "converting" | "completed" | "error";
export type OutputFormat = "jpeg" | "png" | "webp";

export interface ConversionJob {
  id: string;
  file: File;
  status: ConversionStatus;
  targetFormat: OutputFormat;
  resultUrl?: string;
  error?: string;
}

export async function convertHeic(file: File, format: OutputFormat = "jpeg"): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Cannot convert on server side");
  }

  try {
    // Dynamically import heic2any to prevent SSR issues
    const heic2any = (await import("heic2any")).default;

    const mimeType = `image/${format}`;

    const resultBlob = await heic2any({
      blob: file,
      toType: mimeType,
      quality: format === "jpeg" || format === "webp" ? 0.8 : undefined,
    });

    // heic2any can return an array of blobs for image sequences. We just want the first one.
    const blob = Array.isArray(resultBlob) ? resultBlob[0] : resultBlob;
    
    return URL.createObjectURL(blob);
  } catch (error: any) {
    throw new Error(error.message || `Failed to convert HEIC to ${format.toUpperCase()}`);
  }
}
