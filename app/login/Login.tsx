"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useAuth } from "../../hooks/contexts/useAuth"
import { login } from "../../services/auth.service"

const Login = () => {
  const router = useRouter()
  const { newAcessToken } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleConnection = async () => {
    const response = await login(email, password)
    if ("error" in response) {
      console.log(response?.error)
    } else {
      newAcessToken(response?.data?.accessToken)
      router.push("/admin")
    }
  }

  return (
    <div className="w-full h-full bg-gray-50">
      <nav className="sticky top-0 h-16 flex flex-grow flex-row items-center justify-between bg-gray-900 px-4">
        <h1 className="text-white font-medium text-xl">Restauration</h1>
        <div
          onClick={() => router.replace("/")}
          className="flex flex-row gap-2 items-center cursor-pointer"
        >
          <p className="text-white font-medium">
            Retourné à la page d&apos;accueil
          </p>
        </div>
      </nav>
      <div className="flex flex-col flex-1 h-max justify-center items-center gap-8 bg-gray-50">
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
    </div>
  )
}

export default Login
