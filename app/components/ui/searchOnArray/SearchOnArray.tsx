// "use client";

// import { useState } from "react";

// interface SearchProps {
//   setFilteredArray: () => void;
//   array: Array<any>;
// }

// export const SearchOnArray = (props: SearchProps) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     props.setFilteredArray(
//       props.array?.filter((city: any) =>
//         city.city.toLowerCase().includes(query)
//       ) || null
//     );
//   };
//   return <div>SearchOnArray</div>;
// };
