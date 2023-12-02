import React, { useEffect, useState } from "react";
import Search from "./Search";
import User from "./User";
import Footer from "./Footer";

const Admin = () => {
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [isAllSelected, setIsAllSelected] = useState(false);
  // const [page] = useState(10);

  const fetchData = async () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setUsers(d));
  };

  useEffect(() => {
    fetchData();
  }, []);


  const updateSelectedUsers = (add, id) => {
    if (id !== -1) {
      if (add) {
        setSelectedUsers((prev) => [...prev, id]);
      } else setSelectedUsers(selectedUsers?.filter((item) => item !== id));
    } else {
      setIsAllSelected((prev) => !prev);
      if (add) {
        let allUsers = [];
        filteredUsers
          ?.filter((user, index) => shouldShow(index))
          .map((user) => allUsers.push(user?.id));
        setSelectedUsers(allUsers);
      } else selectedUsers([]);
    }
  };

  useEffect(() => {
    setFilteredUsers(users?.filter((user) => filteredQuery(user)));
  }, [search, users]);

  const delSingleUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const delMultipleUsers = () => {
    setUsers((prev) =>
      prev.filter((user) => !selectedUsers.includes(user?.id))
    );
    setSelectedUsers([]);
    setIsAllSelected(false);
  };

  const shouldShow = (index) => {
    return index + 1 > 10 * (pageno - 1) && index + 1 <= 10 * pageno;
  };

  const filteredQuery = (user) => {
    if (search === "") return true;
    return (
      user?.name?.toLowerCase()?.startsWith(search) ||
      user?.email?.toLowerCase()?.startsWith(search) ||
      user?.role?.toLowerCase()?.startsWith(search)
    );

    // const lower = search.toLowerCase();
    // const filteredData = users.filter((user) =>
    //   Object.values(user).some(
    //     (value) =>
    //       typeof value === "string" && value.toLowerCase().includes(lower)
    //   )
    // );  
    // setFilteredUsers(filteredData)
  };


  const editUser = (userId) => {
    setUsers((prev) => [
      ...prev,
      { name: "aa", id: 44, role: "fdsdf", email: "ddcbhe@gmail.com" },
    ]);
  };
  return (
    <>
    <h4   >Admin Panel</h4>
      <Search
        delMultipleUsers={delMultipleUsers}
        search={search}
        setSearch={setSearch}
      />

      <User
        userData={{ name: "Name", email: "Email", role: "Role", id: -1 }}
        updateSelectedUsers={updateSelectedUsers}
        isHeader={true}
        isUserSelected={isAllSelected}
      />

      {filteredUsers
        ?.filter((user, index) => shouldShow(index))
        .map((user) => (
          <User
            userData={user}
            key={user?.id}
            updateSelectedUsers={updateSelectedUsers}
            isUserSelected={selectedUsers?.includes(user?.id)}
            delSingleUser={delSingleUser}
            editUser={editUser}
          />
        ))}

      <Footer
        totalUsers={filteredUsers?.length}
        setPageno={setPageno}
        pageno={pageno}
        selectedUsers={selectedUsers}
      />
    </>
  );
};

export default Admin;
