export type ConversionStatus = "pending" | "converting" | "completed" | "error";

export interface ConversionJob {
  id: string;
  file: File;
  status: ConversionStatus;
  resultUrl?: string;
  error?: string;
}

export async function convertHeicToJpg(file: File): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Cannot convert on server side");
  }

  try {
    // Dynamically import heic2any to prevent SSR issues
    const heic2any = (await import("heic2any")).default;

    const resultBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.8,
    });

    // heic2any can return an array of blobs for image sequences. We just want the first one.
    const blob = Array.isArray(resultBlob) ? resultBlob[0] : resultBlob;
    
    return URL.createObjectURL(blob);
  } catch (error: any) {
    throw new Error(error.message || "Failed to convert HEIC to JPG");
  }
}
