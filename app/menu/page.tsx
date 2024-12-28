import Link from "next/link";
import { neon } from "@neondatabase/serverless";

async function getData() {
  if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT name FROM menus`;
    return response;
  }
  return [];
}

export default async function Page() {
  const data = await getData(); // 서버에서 초기 데이터 가져오기

  async function create(formData: FormData) {
    "use server";
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      const menu = formData.get("menu");
      await sql("INSERT INTO menus (name, priority) VALUES ($1, $2)", [
        menu,
        5,
      ]);
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form action={create} className="flex gap-1">
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="여기에 쓰기"
            name="menu"
          />
          <button className="btn" type="submit">
            추가하기
          </button>
        </form>
        <div>
          <ul className="menu rounded-box w-full">
            {data && data.map((menu) => <li key={menu.id}>{menu.name}</li>)}
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/"
          className="flex gap-1 hover:underline-offset-2 hover:underline"
        >
          홈으로
        </Link>
      </footer>
    </div>
  );
}
