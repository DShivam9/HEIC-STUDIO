import heic2any from "heic2any";

export type ConversionStatus = "pending" | "converting" | "completed" | "error";

export interface ConversionJob {
  id: string;
  file: File;
  status: ConversionStatus;
  resultUrl?: string;
  error?: string;
}

export async function convertHeicToJpg(file: File): Promise<string> {
  const convertedBlob = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.9,
  });

  const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
  return URL.createObjectURL(finalBlob);
}
