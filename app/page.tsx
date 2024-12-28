import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <div className="flex gap-2 items-center flex-col text-center">
          <p className="text-2xl">이거 어때요?</p>
          <p className="text-4xl">{`"김치찌개"`}</p>
        </div>
        <div className="flex gap-2 text-center justify-center w-full">
          <button className="btn btn-primary btn-sm">{`좋아 :)`}</button>
          <button className="btn btn-secondary btn-sm">{`싫어 :(`}</button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/menu"
          className="flex gap-1 hover:underline-offset-2 hover:underline"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          메뉴 추가하기
        </Link>
      </footer>
    </div>
  );
}
