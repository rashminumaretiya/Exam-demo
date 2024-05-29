import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const menu = [
  {
    path: "/",
    menu: "Home",
    isStudent: true,
  },
  {
    path: "/create-exam",
    menu: "Create Exam",
    isStudent: false,
  },
  {
    path: "/view-exam",
    menu: "View Exam",
    isStudent: false,
  },
];
const HeaderContainer = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [userDropdownList, setUserDropdownList] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("loggedUserData"));

  const handleLogout = () => {
    localStorage.removeItem("loggedUserData");
    navigate("/login");
    setAnchorElUser(null);
  };

  const userMenuList = [
    {
      title: "Profile",
      isTeacher: false,
      // handleClick: () => handleLogout(),
    },
    {
      title: "Logout",
      isTeacher: true,
      handleClick: () => handleLogout(),
    },
  ];

  useEffect(() => {
    const menuList =
      userInfo?.role === "student"
        ? menu.filter((el) => el.isStudent !== false)
        : menu;
    setMenuList(menuList);

    const userDropdownList =
      userInfo?.role === "teacher"
        ? userMenuList.filter((el) => el.isTeacher !== false)
        : userMenuList;
    setUserDropdownList(userDropdownList);
  }, [userInfo?.role]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return {
    menuList,
    anchorElUser,
    userDropdownList,
    handleCloseUserMenu,
    handleOpenUserMenu,
    userInfo,
  };
};

export default HeaderContainer;
