import { fontInter, fontPoppins } from "@/fonts";

type PermitType = {
  type: string;
  description: string;
};

type WorkPermitProps = {
  permitTypes: PermitType[];
};

export default function WorkPermit({ permitTypes }: WorkPermitProps) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-amber-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-amber-50">
            <tr>
              <th
                className={`w-[220px] md:w-[320px] border-b border-amber-100 px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-gray-700 ${fontPoppins.className}`}
              >
                Type of Work Permit / Visa
              </th>
              <th
                className={`border-b border-amber-100 px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-gray-700 ${fontPoppins.className}`}
              >
                Description of Work Permit / Visa
              </th>
            </tr>
          </thead>
          <tbody>
            {permitTypes.map((permit, index) => (
              <tr
                key={permit.type}
                className={index % 2 === 0 ? "bg-white" : "bg-stone-50/70"}
              >
                <td
                  className={`border-b border-slate-100 px-6 py-5 align-top text-lg font-semibold text-amber-500 ${fontPoppins.className}`}
                >
                  {permit.type}
                </td>
                <td
                  className={`border-b border-slate-100 px-6 py-5 text-base leading-8 text-slate-600 ${fontInter.className}`}
                >
                  {permit.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
