import OrganizationRow from "./OrganizationRow";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useOrganizations from "./useOrganizations";

const columns = "0.5fr_1fr_2fr_0.5fr_1fr";

function OrganizationTable() {
  const { organizationsList = [], loadingOrganizations } = useOrganizations();

  if (loadingOrganizations)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="mx-auto flex h-full w-full max-w-[800px] flex-col items-center">
      {organizationsList.length === 0 ? (
        <Empty resource="Organizations" />
      ) : (
        <Menus>
          <Table
            columns={columns}
            headers={["S.No", "Name", "Description", "Location", ""]}
            data={organizationsList}
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
