import React, { useState, useEffect } from "react";
import '../css/style.css'
import {FaRegEdit, FaSave} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'


const User = ({
  userData,
  updateSelectedUsers,
  isHeader,
  isUserSelected,
  delSingleUser,
  editUser,
}) => {
  const [user, setUser] = useState({
    name: "Yvhb",
    email: "hjnd@gmail.com",
    role: "member",
  });
  const [isEditing, setisEditing] = useState(false);
  const [rowColor, setRowColor] = useState(isUserSelected?'gray':'white')

  const setIsSelected = () => {
    if (!isUserSelected) {
        updateSelectedUsers(true, userData?.id)
        setRowColor('gray')
        
    }
    else {
        updateSelectedUsers(false, userData?.id)
        setRowColor('white')
    }
  };

  useEffect(() => {
    setUser({
      name: userData?.name,
      email: userData?.email,
      role: userData?.role,
    });
  }, [userData]);

  const updateUser = (type, value) => {
    setUser((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <>
      <table className="userList" style={{backgroundColor: rowColor}}>
        <tbody>
          <tr>
            <td className='checkBox'>
              <input
                type="checkbox"
                checked={isUserSelected}
                name="userSelected"
                onChange={() => {
                    setIsSelected();
                }}
              />
            </td>

            <td className="name" >
              {isEditing ? (
                <input
                  type="text"
                  value={user?.name}
                  onChange={(e) => updateUser("name", e.target.value)}
                />
              ) : (
                user?.name
              )}
            </td>

            <td className="email">
              {isEditing ? (
                <input
                  type="text"
                  value={user?.email}
                  onChange={(e) => updateUser("email", e.target.value)}
                />
              ) : (
                user?.email
              )}
            </td>

            <td className="role">
              {isEditing ? (
                <input
                  type="text"
                  value={user?.role}
                  onChange={(e) => updateUser("role", e.target.value)}
                />
              ) : (
                user?.role
              )}
            </td>

            <td className="actions">
              {isHeader ? (
                <span>Actions</span>
              ) : (
                <>
                  <button className="ActionSaveEditButton" onClick={() => setisEditing((prev) => !prev)}>
                    {isEditing ? <FaSave className="userSaveButton" size={15}/> : <FaRegEdit className="userEditButton" size={15}/>}
                  </button>

                  <button className="ActionDeleteButton" onClick={() => delSingleUser(userData?.id)}>
                    <MdDelete className="userDeleteButton" size={15}/>
                  </button>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default User;
