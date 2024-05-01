import { IoSearchOutline } from "react-icons/io5";
import { Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import { API } from "../utils/makeRequest";

function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("airhomeUser")));
  }, []);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const res = await API.post("/auth/logout", {});

    if (res.status === 200) {
      localStorage.removeItem("airhomeUser");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div className="shadow-sm sticky top-0 bg-white z-50 w-full">
      <div className="max-w-7xl mx-auto p-4 w-full flex items-center justify-between h-[55px]">
        <div className="flex-1">
          <Link to="/">
            <span className="text-2xl font-medium text-primary">airhome</span>
          </Link>
        </div>
        <div className="flex-1 md:flex items-center justify-center hidden cursor-pointer">
          <div className="flex items-center gap-2 divide-x border shadow-sm rounded-3xl md:px-5 sm:px-2 py-2 w-max justify-center">
            <span className="px-2 text-sm">Anywhere</span>
            <span className="px-2 text-sm">Any week</span>
            <div className="px-2 flex items-center gap-3">
              <span className="text-gray-600 text-sm">Add guests</span>
              <button className="bg-primary h-7 w-7 text-white flex items-center justify-center rounded-full">
                <IoSearchOutline size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-5 justify-end">
          <span
            className="sm:block hidden text-sm cursor-pointer"
            onClick={() => navigate(`${user ? "/accommodations" : "/"}`)}
          >
            Airhome your home
          </span>
          <Menu shadow="md" width={250}>
            <Menu.Target>
              <div className="cursor-pointer">
                <img
                  src={
                    user
                      ? `https://avatar.iran.liara.run/username?username=${
                          user.fullName.split(" ")[0]
                        }+${user.fullName.split(" ")[1]}`
                      : "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.avif"
                  }
                  alt=""
                  className="w-[37px] h-[37px] object-cover rounded-full"
                />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              {!user && (
                <Menu.Item onClick={() => setRegisterOpen(true)}>
                  Sign up
                </Menu.Item>
              )}
              {!user && (
                <Menu.Item onClick={() => setLoginOpen(true)}>Log in</Menu.Item>
              )}
              {user && (
                <Menu.Item>
                  <div className="flex flex-col">
                    <span>{user.fullName}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>
                </Menu.Item>
              )}
              {user && (
                <Menu.Item onClick={() => navigate("/bookings")}>
                  My Bookings
                </Menu.Item>
              )}
              {user && (
                <Menu.Item onClick={() => navigate("/accommodations")}>
                  My Accommodations
                </Menu.Item>
              )}

              <Menu.Divider />

              <Menu.Item
                onClick={() => navigate(`${user ? "/accommodations" : "/"}`)}
              >
                Airhome your home
              </Menu.Item>
              <Menu.Item>Help Center</Menu.Item>
              {user && <Menu.Item onClick={handleLogOut}>Log out</Menu.Item>}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      <LoginModal
        open={loginOpen}
        setOpen={setLoginOpen}
        setRegister={setRegisterOpen}
      />
      <RegisterModal
        open={registerOpen}
        setOpen={setRegisterOpen}
        setLogin={setLoginOpen}
      />
    </div>
  );
}

export default Navbar;
