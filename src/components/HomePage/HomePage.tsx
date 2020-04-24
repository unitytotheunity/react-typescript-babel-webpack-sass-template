import * as React from "react"

type HomePageProps = {

}

export default function HomePage(props: HomePageProps) {
  return (
    <div>
      <div className="top-toolbar">
        Top Toolbar
      </div>
      <div className="main-container">
        Middle Toolbar
      </div>
      <div className="bottom-toolbar
      ">
        Bottom Toolbar
      </div>
    </div>
  )
}