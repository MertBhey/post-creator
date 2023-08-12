import { A } from "@solidjs/router"
import { Component } from "solid-js"

export const Navbar: Component = () => {
  return (
    <nav class="w-full h-16 bg-secondary flex flex-row items-center px-6">
      <A href="/"><h1>Post Edit App</h1></A>
      <ul class="ml-auto flex flex-row items-center">
        <A href="/"><li class="p-4">Home</li></A>
        <A href="/edit"><li class="p-4">Edit</li></A>
      </ul>
    </nav>
  )
}
