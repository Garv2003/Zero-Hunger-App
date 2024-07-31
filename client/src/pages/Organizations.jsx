import OrganizationTable from "../Features/Organization/OrganizationTable";

function Organizations() {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div>
        <h3 className="font-mono text-xl font-bold uppercase text-stone-700">
          Organizations
        </h3>
      </div>
      <OrganizationTable />
    </div>
  );
}

export default Organizations;
