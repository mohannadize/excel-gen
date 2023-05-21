import { House } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const ErrorPage = () => <div className='flex justify-center items-center min-h-screen flex-col'>
  <div className="text-2xl uppercase font-black">Page not found</div>
  <div className="font-thin">Looks like you have lost your way</div>
  <Link to="/" className='btn btn-ghost mt-6 gap-2'>
    <span>Go home</span>
    <span><House /></span>
  </Link>
</div>;
