"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useAuth } from "hooks/contexts/useAuth"
import { useToast } from "hooks/contexts/useToast"
import { login } from "services/auth.service"

const Login = () => {
  const router = useRouter()
  const { newAcessToken } = useAuth()
  const { addToast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleConnection = async () => {
    const response = await login(email, password)
    if ("error" in response) {
      console.log(response?.error)
      addToast({
        title: "Erreur",
        message: response?.error.message as string,
        type: "error",
      })
    } else {
      newAcessToken(response?.data?.accessToken)
      addToast({
        title: "Succès",
        message: "Vous vous êtes connecté avec succès",
        type: "success",
      })
      router.push("/admin")
    }
  }

  return (
    // The absolute div under is temporary (bug: https://github.com/vercel/next.js/discussions/41745#discussioncomment-3973420)
    <div className="absolute top-16 left-0 right-0 bottom-0 flex flex-col w-full h-[calc(100%-64px)] justify-center items-center gap-8 bg-gray-50">
      <h1 className="text-3xl font-medium">Connexion</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-96 h-12 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-900 px-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-96 h-12 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-900 px-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
        onClick={handleConnection}
      >
        Se connecter
      </button>
    </div>
  )
}

export default Login
