import { useMTGContext } from "@/contexts/contexts";
import { MTGcardSchema } from "@/data/schema";
import { Row } from "@tanstack/react-table";

interface MTGTableProps {
  type: string;
  rows: Row<MTGcardSchema>[];
}

export function MTGTypeList({ type, rows }: MTGTableProps) {
  function convertColor(color: string[]) {
    let prefix = "mg mg-ci ";
    let ret = color?.length ? color : [""];
    let retStr = ret.join("").toLowerCase() as string;
    if (retStr.length === 0) {
      return retStr;
    } else if (retStr.length === 5) {
      return prefix + "mg-ci-wubrg mg-2x";
    } else {
      return prefix + " mg-ci-" + retStr + " mg-2x";
    }
  }

  const { setLastClickedId } = useMTGContext();

  return (
    <>
      {rows?.length > 0 && (
        <div>
          <i className={"mx-2 mg mg-" + type.toLowerCase() + " mg-fw"}></i>
          {type} ({rows.length})
        </div>
      )}
      {rows.map((row, id) => (
        <div
          key={id}
          className="p-0 m-0 text-sm bg-muted/50 hover:cursor-pointer hover:bg-muted text-left rounded-md flex justify-between items-center"
          onMouseEnter={() => setLastClickedId(row.original.Id)}
          onDoubleClick={() => row.toggleSelected(false)}
        >
          <div className="m-1 flex flex-grow items-center">
            <span className="mx-2">{"1"}</span>
            <span className="truncate max-w-[calc(80%)]">
              {row.original.Name}
            </span>
            <i
              className={
                "ml-auto " + convertColor(row.getValue("Color") as string[])
              }
            ></i>
          </div>
        </div>
      ))}
    </>
  );
}
