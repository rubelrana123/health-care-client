 
import AdminsManagementHeader from "@/components/modules/Admin/AdminsManagement/AdminsManagementHeader";
import AdminsTable from "@/components/modules/Admin/AdminsManagement/AdminsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAdmins } from "@/services/admin/adminManagement";
import { Suspense } from "react";
 
const AdminAdminsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
  // const specialitiesResult = [ ];
  const adminResult = await  getAdmins();
  console.log(adminResult , "admin result");
  const totalPages = Math.ceil(
    (adminResult?.meta?.total || 1) / (adminResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <AdminsManagementHeader/>
      {/* <AdminFilters specialties={specialitiesResult?.data || []} /> */}
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <AdminsTable
          admins={adminResult?.data || []}
        />
        <TablePagination
          currentPage={adminResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminAdminsManagementPage;
