import { timestampToSeconds } from "@/src/utils/downloader";
import LoadRoller from "@/src/components/reusable-components/LoadRoller";


export interface Chapter {
  title: string;
  time: string;
  url: string;
}

const Chapters = ({
  chapters,
  downloadFn,
  isPending
}: {
  chapters: Chapter[];
  downloadFn: (start: number, title: string, end?: number) => void;
  isPending: boolean
}) => {

    return (
    <section className="w-full">
      <header>
        <h2 className="text-xl text-(--text-primary) my-3 w-full text-center font-semibold">
          Chapters
        </h2>
      </header>
      {chapters.length > 0 ? (
        <ul>
          {chapters.map(({ title, time }, index) => {
            return (
              <li key={index} className="w-full flex justify-between items-center px-3 py-5 space-y-3 text-left rounded-md bg-(--main-secondary-light) shadow-md shadow-gray-700">
                <div className="flex flex-col gap-2 flex-1 items-start">
                  <span className="text-lg w-full wrap-break-word font-medium text-(--text-primary)">
                    {title}
                  </span>
                  <span className="text-base font-medium text-(--text-primary-light)">
                    {time}
                    {chapters?.[index + 1]?.time?.length
                      ? ` - ${chapters?.[index + 1]?.time}`
                      : ""}
                  </span>
                </div>
                <button
                  onClick={() =>
                    downloadFn(
                      timestampToSeconds(time),
                      title,
                      chapters?.[index + 1]?.time?.length
                        ? timestampToSeconds(chapters?.[index + 1]?.time)
                        : undefined,
                    )
                  }
                  disabled={isPending}
                  className="flex disabled:opacity-75 py-2 px-4 justify-center items-center text-base text-(--text-primary) not-visited:rounded-full bg-(--main-primary) font-semibold"
                >
                  {isPending ? (
                    <>
                      <span className="sr-only">Downloading chapter</span>
                      <LoadRoller size={20} duration={0.7} />
                    </>
                  ) : (
                    "Download"
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-lg w-full text-center font-medium text-(--text-primary)">
          No Chapters found
        </p>
      )}
    </section>
  );
};

export default Chapters;
