import { neon } from "@neondatabase/serverless";
import Link from "next/link";

async function getData() {
  if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM menus`;
    return response;
  }
  return [];
}

function getRandomMenu(data: any[]) {
  // 우선순위에 따라 가중치를 계산: 우선순위가 낮을수록 높은 가중치
  const totalWeight = data.reduce((acc, menu) => acc + 1 / menu.priority, 0);

  // 누적 가중치 배열 초기화
  let cumulativeWeights: number[] = [];

  // 누적 가중치 계산
  for (let i = 0; i < data.length; i++) {
    const weight = 1 / data[i].priority;
    cumulativeWeights[i] = i === 0 ? weight : cumulativeWeights[i - 1] + weight;
  }

  // 랜덤 값 생성 (0과 totalWeight 사이)
  const randomValue = Math.random() * totalWeight;

  // 랜덤 값을 기준으로 선택된 메뉴 찾기
  const selectedMenuIndex = cumulativeWeights.findIndex(
    (cumulativeWeight) => cumulativeWeight > randomValue
  );

  return data[selectedMenuIndex]; // 선택된 메뉴 반환
}

export default async function Home() {
  const data = await getData(); // 서버에서 초기 데이터 가져오기
  const seleceted = getRandomMenu(data);

  async function deleteMenu() {
    "use server";
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      await sql`
        DELETE FROM menus
        WHERE id = ${seleceted.id}
      `;
    }
  }

  async function updatePriority() {
    "use server";
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      await sql`
        UPDATE menus
        SET priority = priority + 1
        WHERE id = ${seleceted.id}
      `;
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <div className="flex gap-2 items-center flex-col text-center">
          <p className="text-2xl">이거 어때요?</p>
          <p className="text-4xl">{`"${seleceted.name}"`}</p>
        </div>
        <div className="flex gap-2 text-center justify-center w-full">
          <form action={deleteMenu}>
            <button
              className="btn btn-primary btn-sm"
              type="submit"
            >{`좋아 :)`}</button>
          </form>
          <form action={updatePriority}>
            <button
              className="btn btn-secondary btn-sm"
              type="submit"
            >{`싫어 :(`}</button>
          </form>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/menu"
          className="flex gap-1 hover:underline-offset-2 hover:underline"
        >
          메뉴 추가하기
        </Link>
      </footer>
    </div>
  );
}
