"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentView, setCurrentView] = useState<"login" | "register" | "forgot">("login")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    let hasError = false

    if (email.trim() === "") {
      setEmailError("Email is required.")
      hasError = true
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.")
      hasError = true
    } else {
      setEmailError("")
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.")
      hasError = true
    } else {
      setPasswordError("")
    }

    if (hasError) return

    window.location.href = "https://training-mocha-delta.vercel.app/"
  }

  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white p-12">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/municipality-logo.png"
            alt="Eastern Province Municipality logo"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden mb-8 flex justify-center">
            <div className="relative w-40 h-40">
              <Image
                src="/municipality-logo.png"
                alt="Eastern Province Municipality logo"
                fill
                priority
                className="object-contain"
                sizes="160px"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              {currentView === "forgot" && (
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView("login")}
                  className="absolute left-8 top-8 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <h2 className="text-3xl text-foreground">
                {currentView === "login" && "Welcome Back"}
                {currentView === "register" && "Create Account"}
                {currentView === "forgot" && "Reset Password"}
              </h2>
              <p className="text-muted-foreground">
                {currentView === "login" && "Enter your email and password to access your account."}
                {currentView === "register" && "Create a new account to get started."}
                {currentView === "forgot" && "Enter your email address and we'll send you a reset link."}
              </p>
            </div>

            <form onSubmit={handleLogin} noValidate className="space-y-6">
              <div className="space-y-4">
                {currentView === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError("")
                    }}
                    placeholder="name@example.com"
                    aria-invalid={!!emailError}
                    className={`h-12 focus:ring-0 shadow-none rounded-lg bg-white ${
                      emailError
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-[#3F3FF3]"
                    }`}
                  />
                  {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                </div>

                {currentView !== "forgot" && (
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (passwordError) setPasswordError("")
                        }}
                        placeholder="Enter password"
                        aria-invalid={!!passwordError}
                        className={`h-12 pr-10 focus:ring-0 shadow-none rounded-lg bg-white ${
                          passwordError
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-[#3F3FF3]"
                        }`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                  </div>
                )}

                {currentView === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="h-12 pr-10 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {currentView === "login" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="rounded border-gray-300 cursor-pointer" />
                      <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                        Remember Me
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm hover:text-opacity-80 cursor-pointer"
                      style={{ color: "#3F3FF3" }}
                      onClick={() => setCurrentView("forgot")}
                    >
                      Forgot Your Password?
                    </Button>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
                style={{ backgroundColor: "#3F3FF3" }}
              >
                {currentView === "login" && "Log In"}
                {currentView === "register" && "Create Account"}
                {currentView === "forgot" && "Send Reset Link"}
              </Button>
            </form>

            {currentView !== "forgot" && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or {currentView === "login" ? "Login" : "Sign Up"} With
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-12 border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-lg bg-white shadow-none cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-lg bg-white shadow-none cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-.96 3.64-.82 1.57.06 2.75.63 3.54 1.51-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </>
            )}

            <div className="text-center text-sm text-muted-foreground">
              {currentView === "login" && (
                <>
                  {"Don't Have An Account? "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm hover:text-opacity-80 font-medium cursor-pointer"
                    style={{ color: "#3F3FF3" }}
                    onClick={() => setCurrentView("register")}
                  >
                    Register Now.
                  </Button>
                </>
              )}
              {currentView === "register" && (
                <>
                  Already Have An Account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm hover:text-opacity-80 font-medium cursor-pointer"
                    style={{ color: "#3F3FF3" }}
                    onClick={() => setCurrentView("login")}
                  >
                    Sign In.
                  </Button>
                </>
              )}
              {currentView === "forgot" && (
                <>
                  Remember Your Password?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm hover:text-opacity-80 font-medium cursor-pointer"
                    style={{ color: "#3F3FF3" }}
                    onClick={() => setCurrentView("login")}
                  >
                    Back to Login.
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
