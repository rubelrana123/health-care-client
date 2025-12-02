/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
 
 
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
 
import ManagementPageHeader from "@/components/shared/ManagmentTableHeader";
import AdminFormDialog from "./AdminFromDialog";
import { IAdmin } from "@/types/admin.interface";
 
 
const AdminsManagementHeader = ( ) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <AdminFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        
      />

      <ManagementPageHeader
        title="Admins Management"
        description="Manage Admins information and details"
        action={{
          label: "Add Admin    ",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default AdminsManagementHeader;
