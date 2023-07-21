import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <div className="mt-10 flex flex-col items-center gap-y-10">
        <p>404... Page not found.</p>
        <Link to="/" className="px-6 py-2 bg-anep-secondary border border-anep-primary rounded-lg">Home</Link>
    </div>
  )
}

export default PageNotFound
