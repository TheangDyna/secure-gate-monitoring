"use client";

// Mock face-api.js for development without actual face recognition
let isInitialized = false;

// Mock face detection result
interface MockDetection {
  descriptor: Float32Array;
  detection: {
    box: { x: number; y: number; width: number; height: number };
    score: number;
  };
}

export async function initializeFaceAPI() {
  if (isInitialized) return;

  try {
    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isInitialized = true;
    console.log("Mock Face-API initialized");
  } catch (error) {
    console.error("Error initializing Mock Face-API:", error);
    throw error;
  }
}

export async function detectFace(
  imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): Promise<MockDetection | null> {
  if (!isInitialized) {
    await initializeFaceAPI();
  }

  // Simulate face detection with random success/failure
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (Math.random() > 0.2) {
    // 80% success rate
    return {
      descriptor: new Float32Array(
        Array.from({ length: 128 }, () => Math.random())
      ),
      detection: {
        box: { x: 100, y: 100, width: 200, height: 200 },
        score: 0.8 + Math.random() * 0.2
      }
    };
  }

  return null; // No face detected
}

export async function compareFaces(
  descriptor1: Float32Array,
  descriptor2: Float32Array,
  threshold = 0.6
) {
  // Simple comparison based on first few values for demo
  const distance =
    Math.abs(descriptor1[0] - descriptor2[0]) +
    Math.abs(descriptor1[1] - descriptor2[1]);
  return {
    match: distance < threshold,
    confidence: Math.max(0, 1 - distance),
    distance
  };
}

export function serializeDescriptor(descriptor: Float32Array): string {
  return JSON.stringify(Array.from(descriptor));
}

export function deserializeDescriptor(serialized: string): Float32Array {
  return new Float32Array(JSON.parse(serialized));
}

export async function findBestMatch(
  inputDescriptor: Float32Array,
  knownDescriptors: {
    id: number;
    descriptor: Float32Array;
    name: string;
    type: "staff" | "guest";
  }[],
  threshold = 0.6
) {
  let bestMatch = null;
  let bestConfidence = 0;

  for (const known of knownDescriptors) {
    const comparison = await compareFaces(
      inputDescriptor,
      known.descriptor,
      threshold
    );
    if (comparison.match && comparison.confidence > bestConfidence) {
      bestMatch = known;
      bestConfidence = comparison.confidence;
    }
  }

  return bestMatch ? { ...bestMatch, confidence: bestConfidence } : null;
}
