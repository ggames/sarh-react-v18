import { Outlet } from "react-router-dom"

    const Main = () => {
  return (
    <main className="h-[720px]">
       <section className="h-full bg-grey-200">
           <Outlet />
       </section>
    </main>
  )
}

export default Main
