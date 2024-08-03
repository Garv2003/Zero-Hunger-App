import OrganizationTable from "../Features/Organization/OrganizationTable";
import SortBy from "../ui/SortBy";

function Organizations() {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-0">
        <h3 className="font-mono text-xl font-bold uppercase text-stone-700">
          Organizations
        </h3>
        <div>
          <SortBy
            options={[
              {
                field: "Sort by organisation(A-Z)",
                value: "name_asc",
              },
              {
                field: "Sort by organisation(Z-A)",
                value: "name_desc",
              },
              {
                field: "Sort by location(A-Z)",
                value: "location_asc",
              },
              {
                field: "Sort by location(Z-A)",
                value: "location_desc",
              },
            ]}
          />
        </div>
      </div>
      <OrganizationTable />
    </div>
  );
}

export default Organizations;
