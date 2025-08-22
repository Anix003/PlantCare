"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Camera,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Zap,
  Eye,
  RotateCcw,
  Download,
  Sparkles,
  Activity,
  TrendingUp,
  Shield,
  Heart,
  X,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock session and router for demo - replace with actual Next.js imports
const mockSession = {
  user: {
    email: "demo@example.com",
    id: "demo-user-id",
    fullName: "Demo User",
    image: "",
  },
};

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const auth_key = process.env.AUTH_KEY;

export default function PlantDiseaseDetector() {
  // Mock session state for demo
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [userApiKey, setUserApiKey] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Set to false for demo
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const fileInputRef = useRef(null);

  // Mock analysis steps for demo
  const analysisSteps = [
    { label: "Preprocessing image", icon: Eye },
    { label: "Detecting plant features", icon: Leaf },
    { label: "Analyzing health markers", icon: Activity },
    { label: "Checking for diseases", icon: AlertTriangle },
    { label: "Generating recommendations", icon: TrendingUp },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (selectedFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or WebP)");
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
      setShowResults(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setShowResults(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);
    // setAnalysisStep(0);
    // setConfidence(0);

    // Enhanced loading animation
    // const animateAnalysis = async () => {
    //   for (let i = 0; i < analysisSteps.length; i++) {
    //     setAnalysisStep(i);
    //     await new Promise((resolve) => setTimeout(resolve, 1000));

    //     const targetConfidence = (i + 1) * 20;
    //     let currentConfidence = confidence;
    //     const interval = setInterval(() => {
    //       currentConfidence += 2;
    //       setConfidence(currentConfidence);
    //       if (currentConfidence >= targetConfidence) {
    //         clearInterval(interval);
    //       }
    //     }, 30);
    //   }
    // };

    try {
      // Start the animation
      // const animationPromise = animateAnalysis();

      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);

      const response = await fetch("/api/detect", {
        method: "POST",
        headers: {
          "x-api-key": userApiKey || api_key,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // Wait for animation to complete
      // await animationPromise;

      setResult(data);
      setShowResults(true);
    } catch (err) {
      console.error("Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getApiKey = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/apikey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email: session?.user?.email || "",
          id: session?.user?.id || "",
        },
      });
      const result = await response.json();

      if (result.success) {
        setUserApiKey(result.data.apiKey || "");
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    if (session?.user) {
      const email = session.user?.email || "";
      const id = session.user?.id || "";
      const name = session.user?.fullName || "";
      setUserEmail(email || "");
      setUserId(id || "");
      setUserName(name || "");
      await getApiKey();
    }
  };

  useEffect(() => {
    fetchData();
  }, [isRefreshing]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/home");
      return;
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, session, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-emerald-200/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-teal-200/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-green-300/30 rounded-full animate-bounce delay-700"></div>
      </div> */}

      <div className="relative z-10 flex min-h-screen flex-col items-center p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Leaf className="w-12 h-12 text-green-600 animate-pulse" />
              {/* <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 animate-spin" /> */}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            PlantCare AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Advanced plant health analysis powered by artificial intelligence
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>99.2% Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Plant Care Tips</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-6xl">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {!showResults ? (
              <div className="p-8 md:p-12">
                {/* Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`relative mb-8 p-12 md:p-16 border-2 border-dashed rounded-2xl text-center transition-all duration-500 transform hover:scale-[1.02] ${
                    isDragging
                      ? "border-green-400 bg-green-50 scale-105"
                      : previewUrl
                      ? "border-green-300 bg-green-50/50"
                      : "border-gray-300 hover:border-green-400 bg-gray-50/50 hover:bg-green-50/50"
                  }`}
                >
                  {!previewUrl ? (
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
                            <Upload className="w-10 h-10 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700 mb-2">
                          Drop your plant image here
                        </p>
                        <p className="text-gray-500 mb-4">
                          Or{" "}
                          <label
                            htmlFor="file-upload"
                            className="text-green-600 cursor-pointer hover:text-green-700 font-medium underline decoration-2 underline-offset-2"
                          >
                            browse files
                          </label>{" "}
                          to get started
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Camera className="w-4 h-4" />
                            <span>JPG, PNG, WebP</span>
                          </span>
                          <span>•</span>
                          <span>Max 5MB</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="relative group">
                        <Image
                          src={previewUrl}
                          alt="Uploaded plant"
                          width={400}
                          height={320}
                          className="max-h-80 mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl"></div> */}
                      </div>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={handleRemoveFile}
                          className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                        >
                          <X className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Replace</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    id="file-upload"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Analysis Button */}
                {file && !loading && (
                  <div className="text-center mb-8">
                    <button
                      onClick={handleSubmit}
                      className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    >
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                      <div className="flex items-center justify-center space-x-3">
                        <Zap className="w-6 h-6 group-hover:animate-pulse" />
                        <span className="">Analyze Plant Health</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Loading State */}
                {loading && (
                  <div className="text-center space-y-8">
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                        <Leaf className="w-16 h-16 text-white animate-pulse" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-ping opacity-20"></div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-800">
                        Analyzing Your Plant ...
                      </h3>
                      {/* <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500 rounded-full shadow-lg"
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                      <p className="text-lg text-gray-600 font-medium">
                        {confidence}% Complete
                      </p> */}
                    </div>

                    {/* <div className="space-y-3">
                      {analysisSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === analysisStep;
                        const isComplete = index < analysisStep;

                        return (
                          <div
                            key={index}
                            className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                              isActive
                                ? "bg-green-100 text-green-800 shadow-md transform scale-105"
                                : isComplete
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-50 text-gray-400"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isActive
                                  ? "bg-green-500 text-white animate-pulse"
                                  : isComplete
                                  ? "bg-green-400 text-white"
                                  : "bg-gray-300 text-gray-500"
                              }`}
                            >
                              {isComplete ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <Icon className="w-5 h-5" />
                              )}
                            </div>
                            <span className="font-medium">{step.label}</span>
                          </div>
                        );
                      })}
                    </div> */}
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-6 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6" />
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Results Section */
              <div className="p-8 md:p-12 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    {result.detected ? (
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                      </div>
                    ) : result.obj === "plant" || result.obj === "pest" ? (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    {result.detected
                      ? "Health Issues Detected"
                      : result.obj === "plant" || result.obj === "pest"
                      ? "Plant Looks Healthy!"
                      : "Plant Health Uncertain"}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Original Image */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-center">
                      Original Image
                    </h3>
                    <div className="relative group overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={previewUrl}
                        alt="Uploaded plant"
                        width={400}
                        height={320}
                        className="max-h-80 mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Processed Image */}
                  {result.processed_image && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-center">
                        AI Analysis
                      </h3>
                      <div className="relative group overflow-hidden rounded-xl shadow-lg">
                        <Image
                          src={result.processed_image}
                          alt="Uploaded plant"
                          width={400}
                          height={320}
                          className="max-h-80 mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis Results */}
                {!result.detected ? (
                  result.obj === "plant" || result.obj === "pest" ? (
                    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-center shadow-lg">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-green-800 mb-4">
                        Excellent Plant Health!
                      </h3>
                      <p className="text-green-700 text-lg leading-relaxed">
                        Your plant appears to be thriving with no visible signs
                        of disease or pest damage. Keep up the great care!
                      </p>
                    </div>
                  ) : (
                    <div className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl text-center shadow-lg">
                      <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-yellow-800 mb-4">
                        Plant Health Uncertain
                      </h3>
                      <p className="text-yellow-700 text-lg leading-relaxed">
                        The analysis could not determine the plant{"'"}s health
                        status. Please ensure the image is clear and well-lit,
                        and try again.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center text-yellow-700 mb-6">
                      Detected Issues & Recommendations
                    </h3>
                    {result.issues.map((issue, index) => (
                      <div
                        key={index}
                        className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-yellow-800 mb-2">
                              {issue.name}
                            </h4>
                            <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                              {issue.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-600">
                              {issue.confidence}%
                            </div>
                            <div className="text-sm text-gray-600">
                              Confidence
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-white/50 rounded-xl">
                            <h5 className="font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                              <Eye className="w-4 h-4" />
                              <span>What we found:</span>
                            </h5>
                            <p className="text-gray-700">{issue.description}</p>
                          </div>

                          <div className="p-4 bg-white/50 rounded-xl">
                            <h5 className="font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                              <Zap className="w-4 h-4" />
                              <span>Recommended action:</span>
                            </h5>
                            <p className="text-gray-700">{issue.treatment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      handleRemoveFile();
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Analyze Another Plant</span>
                  </button>

                  {/* <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download Report</span>
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
