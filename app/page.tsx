"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  const [formError, setFormError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setFormError("")

    const normalizedEmail = email.trim().toLowerCase()
    let hasError = false

    if (normalizedEmail === "") {
      setEmailError("Email is required.")
      hasError = true
    } else if (!EMAIL_REGEX.test(normalizedEmail)) {
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

    setIsLoading(true)

    try {
      const res = await fetch("/authorized-users.json", { cache: "no-store" })
      const users: Array<{ email: string; password: string }> = await res.json()

      const matchedUser = users.find((user) => user.email.trim().toLowerCase() === normalizedEmail)

      if (!matchedUser) {
        setFormError("No account was found for this email.")
        return
      }

      if (matchedUser.password !== password) {
        setFormError("Incorrect password.")
        return
      }

      window.location.href = "https://training-mocha-delta.vercel.app/"
    } catch {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
                      if (formError) setFormError("")
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
                          if (formError) setFormError("")
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
                disabled={isLoading}
                className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#3F3FF3" }}
              >
                {currentView === "login" && (isLoading ? "Logging In..." : "Log In")}
                {currentView === "register" && "Create Account"}
                {currentView === "forgot" && "Send Reset Link"}
              </Button>

              {formError && (
                <p className="text-center text-sm text-red-500" role="alert">
                  {formError}
                </p>
              )}
            </form>

            {currentView === "forgot" && (
              <div className="text-center text-sm text-muted-foreground">
                Remember Your Password?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm hover:text-opacity-80 font-medium cursor-pointer"
                  style={{ color: "#3F3FF3" }}
                  onClick={() => setCurrentView("login")}
                >
                  Back to Login.
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
