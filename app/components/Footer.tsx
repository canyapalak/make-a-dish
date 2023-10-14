import "tailwindcss/tailwind.css";
import { Home, Github, Send, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <div
      className="px-12 flex flex-col gap-4 align-middle items-center 
      mb-0 top-auto w-screen
        py-4 sticky p-3 border-t-4 bg-white border-slate-700 shadow-lg shadow-zinc-600 mt-10 text-center"
    >
      <div className="inline-block">
        <span className="text-red-500">Make a Dish</span>
        <span> by Can Yapalak</span>
        <p className="mt-1">
          This app uses{" "}
          <a
            href="https://openai.com/blog/openai-api"
            target="_blank"
            className="text-lime-700 hover:underline"
          >
            OpenAI API
          </a>{" "}
          to generate recipes.
        </p>
      </div>

      <div className="flex mx-auto text-lg gap-8">
        <div>
          <a target="_blank" href="https://canyapalak.vercel.app/">
            <Home className="cursor-pointer w-7 h-7 hover:text-red-500" />
          </a>
        </div>
        <div>
          <a target="_blank" href="mailto:canyapalak@gmail.com">
            <Send className="cursor-pointer w-7 h-7 hover:text-red-500" />
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/canyapalak">
            <Github className="cursor-pointer w-7 h-7 hover:text-red-500" />
          </a>
        </div>
        <div>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/can-yapalak-a1359b76/"
          >
            <Linkedin className="cursor-pointer w-7 h-7 hover:text-red-500" />
          </a>
        </div>
      </div>
    </div>
  );
}
