# UnHEIC

**Your Photos, Unchained. The standard for absolute privacy in image conversion.**

UnHEIC is a pure client-side web application engineered to instantly and securely convert Apple's proprietary HEIC (High-Efficiency Image Container) photos into universally compatible JPGs.

## What It Is

UnHEIC is a premium, minimalist web utility built for users who demand speed, beautiful design, and uncompromising data privacy. By leveraging modern web technologies, it transforms your browser into a local processing engine, eliminating the need for cloud infrastructure or file uploads.

## What It Does

- **Client-Side Decoding:** UnHEIC uses WebAssembly (`heic2any`) to decode HEIC images directly within your browser's local memory.
- **Batch Processing:** Drop dozens of images at once. The tool processes them concurrently and packages the results into a single, convenient ZIP file for immediate download.
- **Instant Velocity:** Because there are no upload queues, network bottlenecks, or server processing times, conversions happen near-instantaneously, limited only by your own device's hardware capabilities.
- **Pristine Quality:** The conversion engine carefully preserves the original color profiles and high-resolution details of your Apple photography.

## Why We Built It

Every day, millions of people search for ways to convert their iPhone photos to a format they can use on older devices, Windows PCs, or specific web platforms. 

The vast majority of existing solutions require users to upload their deeply personal, private photos to random, ad-riddled, third-party servers. This is a massive privacy risk. Once a photo leaves your device, you surrender control over how it is stored, who can see it, and what it might be used for.

We built UnHEIC to solve this problem permanently. By bringing the conversion directly to the edge—your device—we eliminate the server entirely. Your photos never leave your computer, ensuring 100% privacy and zero risk of data exposure.

## Technical Architecture

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion for cinematic, high-end micro-interactions
- **Conversion Engine:** `heic2any` (WebAssembly)
- **File Management:** `jszip` and `file-saver` for robust batch downloading

---

*Designed and engineered with absolute respect for user privacy.*
