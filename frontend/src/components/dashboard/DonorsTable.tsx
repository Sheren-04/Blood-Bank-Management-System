import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/scroll";
import api from '../../services/api';

interface Donor {
  id: number;
  name: string;
  phone: string;
  email: string;
  bloodGroup: string;
  city: string;
  gender: string;
  status: "Active" | "Inactive";
}

interface DonorsTableProps {
  searchQuery: string;
  bloodGroupFilter: string;
}

export function DonorsTable({
  searchQuery,
  bloodGroupFilter,
}: DonorsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [donors, setDonors] = useState<Donor[]>([]);
  const itemsPerPage = 10;

  // Filter donors based on search query and blood group filter
  const filteredDonors = donors && donors?.length > 0 ? donors?.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // donor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.phone.includes(searchQuery) ||
      donor.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBloodGroup =
      bloodGroupFilter === "all" || donor.bloodGroup === bloodGroupFilter;

    return matchesSearch && matchesBloodGroup;
  }) : [];

  // Pagination
  const totalPages = filteredDonors && Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonors = filteredDonors && filteredDonors.slice(startIndex, endIndex);

  // const handleDelete = (id: number, name: string) => {
  //   if (confirm(`Are you sure you want to delete donor "${name}"?`)) {
  //     // Handle delete logic here
  //     console.log("Deleting donor:", id);
  //   }
  // };

  const getAllDonor = async () => {
    try {
      // const token = sessionStorage.getItem("token");

      const res = await api.get(`/donors/get-donors`);

      if (res?.data) {
        const  { data, count }  = res.data || {};
        setDonors([...data]);
      }
    } catch (err) {
      console.error("Failed to fetch donors:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAllDonor();
  }, []);

  return (
    <div>
      {/* Table Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-900">
                Name
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Phone
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Email
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Blood Group
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                City
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Gender
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDonors && currentDonors.length > 0 ? (
              currentDonors.map((donor) => (
                <tr
                  key={donor.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium text-gray-900">
                    {donor.name}
                  </td>
                  <td className="p-4 text-gray-700">{donor.phone}</td>
                  <td className="p-4 text-gray-700">{donor.email}</td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">
                      {donor.bloodGroup}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{donor.city}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {donor?.gender}
                    </span>
                  </td>
                  {/* <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-700 hover:text-gray-900 font-medium">
                        View
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-gray-700 hover:text-gray-900 font-medium">
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDelete(donor.id, donor.name)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No donors found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredDonors && filteredDonors?.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-700">
            Showing {startIndex + 1}–{Math.min(endIndex, filteredDonors?.length || 0)}{" "}
            of {filteredDonors?.length} donors
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
