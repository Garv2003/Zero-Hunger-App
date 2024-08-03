import OrganizationRow from "./OrganizationRow";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useOrganizations from "./useOrganizations";
import Loader from "../../ui/Loader";
import { useSearchParams } from "react-router-dom";

const columns = "0.5fr_1fr_2fr_0.5fr_1fr";

function OrganizationTable() {
  const { organizationsList = [], loadingOrganizations } = useOrganizations();
  const [searchParams] = useSearchParams();
  if (loadingOrganizations) return <Loader />;
  const currsort = searchParams.get("sortBy") || "name_asc";
  const [field, direction] = currsort.split("_");

  const modifier = direction === "asc" ? 1 : -1;

  let sortedData = organizationsList.sort(
    (a, b) => a[field].localeCompare(b[field]) * modifier,
  );

  console.log(sortedData);

  return (
    <section className="mx-auto flex h-full w-full max-w-[800px] flex-col items-center">
      {organizationsList.length === 0 ? (
        <Empty resource="Organizations" />
      ) : (
        <Menus>
          <Table
            columns={columns}
            headers={["S.No", "Name", "Description", "Location", ""]}
            data={sortedData}
            render={(organization, index) => (
              <OrganizationRow
                index={index + 1}
                columns={columns}
                key={organization._id}
                organization={organization}
              />
            )}
          ></Table>
        </Menus>
      )}
    </section>
  );
}

export default OrganizationTable;
