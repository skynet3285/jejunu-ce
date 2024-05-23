export default function InvestGuide() {
  return (
    <article className="flex justify-center">
      <div className="mt-10 flex flex-col justify-around">
        <a
          href="guide/tutorial/"
          className="flex h-[7rem] w-[21rem] flex-col justify-center rounded-lg border-black px-4 shadow-xl"
        >
          <p className="mb-2 self-center text-lg font-bold">
            펜바잉 서비스가 처음이라면?
          </p>
          <p className="self-end font-bold text-violet-800">
            튜토리얼 시작하기
          </p>
        </a>
        <div className="h-4" />
        <a
          href="guide/sharePension/"
          className="flex h-[7rem] w-[21rem] flex-col justify-center rounded-lg border-black px-4 shadow-xl"
        >
          <p className="mb-2 self-center text-lg font-bold">
            부동산 지분을 어떻게 공유해요?
          </p>
          <p className="self-end font-bold text-violet-800">
            개인간 지분 공유 방법 알아보기
          </p>
        </a>
        <div className="h-4" />
        <a
          href="guide/tutorial/"
          className="flex h-[7rem] w-[21rem] flex-col justify-center rounded-lg border-black px-4 shadow-xl"
        >
          <p className="mb-2 self-center text-lg font-bold">
            펜션을 건축하기 위한 과정은?
          </p>
          <p className="self-end font-bold text-violet-800">
            펜션 건축 절차 알아보기
          </p>
        </a>
      </div>
    </article>
  );
}
