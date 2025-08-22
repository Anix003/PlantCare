"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Database,
  FileSpreadsheet,
  Key,
  Lock,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Google Authentication",
    description:
      "Secure and simple sign-in with Google OAuth, saving you time and enhancing security.",
    icon: <Shield className="h-12 w-12 text-blue-500 mb-5" />,
  },
  {
    title: "Advanced Image Analysis",
    description:
      "Utilize cutting-edge AI algorithms to analyze plant images for disease detection and treatment recommendations.",
    icon: <FileSpreadsheet className="h-12 w-12 text-green-500 mb-5" />,
  },
  {
    title: "API Key Management",
    description:
      "Create, manage, and secure API keys for third-party integrations and services.",
    icon: <Key className="h-12 w-12 text-purple-500 mb-5" />,
  },
  {
    title: "Secure Data Storage",
    description:
      "Your data is encrypted and securely stored with enterprise-grade protection.",
    icon: <Database className="h-12 w-12 text-orange-500 mb-5" />,
  },
];

const testimonials = [
  {
    quote:
      "This solution saved our team countless hours of integration work. The Google Sheets connection is flawless!",
    author: "Sarah Johnson",
    role: "Product Manager",
    company: "TechFlow Inc.",
  },
  {
    quote:
      "Authentication has never been easier. The Google sign-in feature works perfectly, and our users love it.",
    author: "Michael Chen",
    role: "CTO",
    company: "Startwise",
  },
  {
    quote:
      "The API key management system is robust and secure. Exactly what we needed for our enterprise clients.",
    author: "Emma Rodriguez",
    role: "Developer Lead",
    company: "DataSync Solutions",
  },
];

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
                <span className="text-green-800 font-medium text-sm">
                  AI-Powered Plant Health Analysis
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                  Plant Disease Detection System
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Identify plant diseases and pests with AI-powered analysis.
                Upload a photo and get detailed insights and treatment
                recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-6 text-lg"
                  onClick={() => router.push("/test")}
                >
                  Launch Web Interface
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg border-2"
                  onClick={() => {
                    const featuresSection = document.getElementById("features");
                    featuresSection.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn More
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-30 transform -rotate-6"></div>
              <Image
                src="/img/image.png"
                alt="Plant Disease Detection"
                width={600}
                height={400}
                className="relative z-10 border-2 rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our solution provides seamless integration between Next.js, Google
              Authentication, and Google Sheets for a complete data management
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple three-step process to get your application up and running
              with Google integration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sign In with Google
              </h3>
              <p className="text-gray-600">
                Authenticate securely using your Google account credentials.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Generate API Key
              </h3>
              <p className="text-gray-600">
                Create secure API keys to access your data programmatically.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-500 text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Start Integration
              </h3>
              <p className="text-gray-600">
                Verify that your integration is working correctly by testing
                the API endpoints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {/* <div className="py-20 bg-white hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by developers and teams around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-gray-600 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Documentation Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About the System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Plant Disease Detection System leverages AI to analyze plant
              images, identify diseases or pests, and provide actionable
              treatment recommendations. It is designed to assist farmers,
              gardeners, and researchers in maintaining plant health
              efficiently.
            </p>
          </div>

          <div className="card bg-gray-50 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              API Documentation
            </h3>
            <p className="text-gray-600 mb-6">
              Our system provides a REST API for seamless integration with your
              applications. Below are the available endpoints:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">GET /</code> -
                Homepage
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  GET /health
                </code>
                - API health check
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  POST /detect
                </code>
                - Analyze plant image
              </li>
              {/* <li>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  GET /gradio
                </code>
                - Web interface
              </li> */}
            </ul>

            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Example: Detect Plant Issues
            </h4>
            <p className="text-gray-600 mb-4">
              Send a POST request to{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">/detect</code>{" "}
              with an image file:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800">
                curl -X POST -F &quot;file=@plant.jpg&quot;
                http://haritra-ai.vercel.app/detect
              </pre>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">
              Response Format
            </h4>
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800">{`{
  "detected": true,
  "valid": true,
  "blurred": false,
  "obj": "plant",
  "issues": [
    {
      "type": "disease",
      "name": "Powdery Mildew",
      "confidence": 92,
      "description": "Fungal infection appearing as white powdery spots",
      "treatment": "Apply fungicide and improve air circulation",
      "bbox": [10, 20, 30, 40]
    }
  ],
  "processed_image": "data:image/jpeg;base64,..."
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Sparkles className="h-12 w-12 mx-auto text-blue-200" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are already managing their data with our
            Google Sheets integration.
          </p>
          <Button
            className="bg-white text-indigo-700 hover:bg-blue-50 px-8 py-6 text-lg"
            onClick={() => router.push("/signup")}
          >
            Sign Up Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
