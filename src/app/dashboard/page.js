"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  RefreshCw,
  Key,
  User,
  Mail,
  Hash,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Trash2,
  LoaderCircle,
} from "lucide-react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userApiKey, setUserApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch existing API key
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
      console.log("Fetched API key:", result.data);

      if (result.success) {
        setUserApiKey(result.data.apiKey || "");
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "Failed to fetch API key. Please try again.",
      //   confirmButtonColor: "#3085d6",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate new API key
  const generateApiKey = async () => {
    try {
      console.log("Generating new API key...", userEmail, userId);
      setIsGenerating(true);
      const response = await fetch("/api/apikey/generate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          id: userId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setUserApiKey(result.data.apiKey);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "New API key generated successfully!",
          confirmButtonColor: "#10b981",
        });
      } else {
        throw new Error(result.message || "Failed to generate API key");
      }
    } catch (error) {
      console.error("Error generating API key:", error);
      Swal.fire({
        icon: "error",
        title: "Generation Failed",
        text: error.message || "Failed to generate API key. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsGenerating(false);
      copyToClipboard(userApiKey);
    }
  };

  // Regenerate API key with confirmation
  const regenerateApiKey = () => {
    Swal.fire({
      title: "Regenerate API Key?",
      text: "This will invalidate your current API key. Any applications using the old key will stop working.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, regenerate it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        generateApiKey();
        setShowApiKey(false);
      }
    });
  };

  // Delete API key with confirmation
  const deleteApiKey = async () => {
    try {
      console.log("Deleting API key...", userEmail, userId);
      setIsDeleting(true);
      const response = await fetch("/api/apikey/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          id: userId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setUserApiKey(result.data.apiKey);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your API key deleted successfully!",
          confirmButtonColor: "#10b981",
        });
      } else {
        throw new Error(result.message || "Failed to delete API key");
      }
    } catch (error) {
      console.error("Error deleting API key:", error);
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: error.message || "Failed to delete API key. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsDeleting(false);
      // setIsRefreshing(!isRefreshing);
    }
  };

  const handleDeleteApiKey = () => {
    Swal.fire({
      title: "Delete API Key?",
      text: "Are you sure you want to delete your API key? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApiKey();
      }
    });
  };

  // Copy API key to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Copied to clipboard!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to copy",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const maskApiKey = (key) => {
    return key.replace(/.(?=.{4})/g, "*");
  };

  // // Handle sign out with confirmation
  // const handleSignOut = () => {
  //   Swal.fire({
  //     title: "Sign Out?",
  //     text: "Are you sure you want to sign out?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#ef4444",
  //     cancelButtonColor: "#6b7280",
  //     confirmButtonText: "Yes, sign out",
  //     cancelButtonText: "Cancel"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       signOut();
  //     }
  //   });
  // };

  const fetchData = async () => {
    if (session?.user) {
      const email = session.user?.email || "";
      const id = session.user?.id || "";
      const name = session.user?.fullName || "";
      const imageUrl = session.user?.image || "";
      setUserEmail(email || "");
      setUserId(id || "");
      setUserName(name || "");
      // setUserImageUrl(imageUrl || "");
      await getApiKey();
    }
  };

  useEffect(() => {
    fetchData();
  }, [isRefreshing]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, session, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="pt-14 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{" "}
            <span className="capitalize text-blue-600">
              {(userName || userEmail).split(" ")[0]}
            </span>
            !
          </h1>
          <p className="text-gray-600">
            Manage your API keys and account settings from here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* User Information Card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Account Information</span>
              </CardTitle>
              <CardDescription>
                Your account details and authentication status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-700">Name</span>
                </div>
                <span className="text-gray-900 capitalize">
                  {userName || "Not provided"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-700">Email</span>
                </div>
                <span className="text-gray-900">{userEmail}</span>
              </div>

              {false && <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Hash className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-gray-700">User ID</span>
                </div>
                <span className="text-gray-900 font-mono text-sm">
                  {userId}
                </span>
              </div>}

              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-gray-700">Status</span>
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-700 border-emerald-300"
                >
                  Authenticated
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* API Key Management Card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-indigo-600" />
                <span>API Key Management</span>
              </CardTitle>
              <CardDescription>
                Generate and manage your API keys for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userApiKey ? (
                <>
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      You have an active API key. Keep it secure and don&apos;t
                      share it publicly.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Your API Key
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 p-3 bg-gray-50 rounded-lg border font-mono text-sm">
                        {showApiKey
                          ? userApiKey
                          : userApiKey.replace(/.(?=.{6})/g, "•")}
                          {/* : "••••••••••••••••••••••••••••••••"} */}
                      </div>
                      <div
                        className="flex p-2 border border-gray-200 items-center rounded-md text-gray-600 hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className="flex border border-gray-200 items-center rounded-md text-gray-600 hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                        onClick={() => copyToClipboard(userApiKey)}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <Copy className="w-4 h-4 m-2" />
                            <span className="sr-only">Copy</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy to clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      className=" border-orange-300 text-orange-700 hover:bg-orange-50"
                      onClick={regenerateApiKey}
                      disabled={isGenerating || isDeleting}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-0 animate-spin" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-0" />
                          Regenerate API Key
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className=" bg-red-600 text-red-100 border-red-300 hover:text-red-700 hover:bg-red-50"
                      onClick={handleDeleteApiKey}
                      disabled={isDeleting || isGenerating}
                    >
                      {isDeleting ? (
                        <>
                          <LoaderCircle className="w-4 h-4 mr-0 animate-spin" />
                          {/* Deleting... */}
                        </>
                      ) : (
                        <>
                          <Tooltip>
                            <TooltipTrigger>
                              <Trash2 className="w-4 h-4 mr-0" />
                              <span className="sr-only">Delete</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete API Key</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Regenerating...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Regenerate API Key
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                          <span>Regenerate API Key?</span>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will create a new API key and invalidate the
                          current one. Any applications using the old key will
                          stop working immediately. This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={generateApiKey}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          Yes, regenerate
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                </>
              ) : (
                <>
                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      You don&apos;t have an API key yet. Generate one to start
                      using our API services.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={generateApiKey}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4 mr-2" />
                        Generate API Key
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Usage Information */}
        <Card className="mt-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>API Usage Guidelines</CardTitle>
            <CardDescription>
              Important information about using your API key
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Security Best Practices
                </h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Never share your API key publicly</li>
                  <li>• Store it securely in environment variables</li>
                  <li>• Regenerate if you suspect it&apos;s compromised</li>
                  <li>• Use HTTPS for all API requests</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Integration
                </h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Include key in Authorization header</li>
                  <li>• Monitor your usage and rate limits</li>
                  <li>• Check our documentation for endpoints</li>
                  <li>• Contact support for assistance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;