"use client";
import { ExtendedUser } from "@/next-auth";
import { Registration, RegistrationStatus, User } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Button, Table } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { default as Link, default as NextLink } from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RegistrationStatusBadge from "../../components/RegistrationStatusBadge";

export interface regQuery {
  status: RegistrationStatus;
  orderBy: keyof User;
  eventId: number;
  page: string;
}

interface Props {
  searchParams: regQuery;
  reg: Registration[];
  currentUser: ExtendedUser | null;
}

// Adjusted state type to allow `user` to be `null`
interface RegistrationWithUser extends Registration {
  user: User | null;
}

const RegistrationTable = ({ searchParams, reg, currentUser }: Props) => {
  const router = useRouter();
  const { eventid: eventId } = useParams();
  const [records, setRecords] = useState<RegistrationWithUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const filteredReg = reg.filter(
        (record) => record.eventId === Number(eventId)
      );
      const results = await Promise.all(
        filteredReg.map(async (record) => {
          try {
            const response: AxiosResponse<User> = await axios.get(
              `/api/users/${record.userId}`
            );
            return {
              ...record,
              user: response.data, // Extract `data` from the Axios response
            };
          } catch (error) {
            console.error(`Error fetching user ${record.userId}:`, error);
            return {
              ...record,
              user: null, // Handle error by assigning null if user fetch fails
            };
          }
        })
      );
      setRecords(results);
    };

    fetchUserData();
  }, [reg]);
  const handleApproval = async (registrationId: number) => {
    setLoading(true);
    try {
      await axios.patch(`/api/register/${registrationId}`, {
        status: "approved",
      });
      // Update UI or show success message
    } catch (error) {
      console.error("Failed to approve:", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  const handleRejection = async (registrationId: number) => {
    try {
      setLoading(true);
      await axios.patch(`/api/register/${registrationId}`, {
        status: "rejected",
      });
      // Update UI or show success message
    } catch (error) {
      console.error("Failed to approve:", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column, index) => (
            <Table.ColumnHeaderCell
              key={`${column.value}-${index}`}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
          {/* Add Actions header if user is an Admin */}
          {currentUser?.role === "ADMIN" && (
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {records.map((record, index) => (
          <Table.Row key={`${record.id}-${index}`}>
            <Table.Cell>
              {record.user ? (
                <Link href={`/profile/${record.user.id}`}>
                  {record.user.name}
                </Link>
              ) : (
                <span>Unknown User</span>
              )}
              <div className="block md:hidden">
                <RegistrationStatusBadge status={record.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <RegistrationStatusBadge status={record.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {record.user?.phone || "N/A"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {record.user?.email || "N/A"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {record.user?.address || "N/A"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {new Date(record.createdAt).toLocaleDateString("en-GB", {
                weekday: "short", // Mon
                year: "numeric", // 2024
                month: "short", // Sep
                day: "2-digit", // 16
              })}
            </Table.Cell>

            {/* Add action buttons if current user is an Admin */}
            {currentUser?.role === "ADMIN" && (
              <Table.Cell>
                <Button
                  disabled={loading || record.status !== "pending"}
                  onClick={() => handleApproval(record.id)}
                  size="2"
                  mr="2"
                  variant="solid"
                  color="green"
                  // className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Approve
                </Button>
                <Button
                  size="2"
                  disabled={loading || record.status !== "pending"}
                  onClick={() => handleRejection(record.id)}
                  color="crimson"
                  variant="solid"
                  // className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value?: keyof User;
  status?: string;
  className?: string;
}[] = [
  { label: "Name", value: "name" },
  { label: "Status", status: "Status" },
  { label: "Phone", value: "phone", className: "hidden md:table-cell" },
  { label: "Email", value: "email", className: "hidden md:table-cell" },
  { label: "Location", value: "address", className: "hidden md:table-cell" },
  {
    label: "Created_At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];
//how do i implement this in this file and export it to page.tsx
//  const orderBy = columnNames.includes(searchParams.orderBy)
//? { [searchParams.orderBy]: "asc" }
//: undefined;

export const columnNames = columns.map((column) => column.value);
export default RegistrationTable;
