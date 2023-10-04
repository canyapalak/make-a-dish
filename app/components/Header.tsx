import Link from "next/link";

export default function Header() {
  return (
    <div className="mt-8 mx-auto text-center">
      <p className="text-6xl font-semibold text-center block">
        <Link href="/">
          <span className="text-red-500">MAKE·A·DISH</span>
        </Link>
      </p>
    </div>
  );
}
