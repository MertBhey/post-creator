import { A } from "@solidjs/router"
import { Component } from "solid-js"

interface HomeProps {}

export const Home: Component<HomeProps> = props => {
  return (
    <>
      <div>Home Page</div>

      <span>I'm too lazy to create a home page. Head over to <A href="/edit" class="text-blue-700">edit page</A></span>
    </>
  )
}
