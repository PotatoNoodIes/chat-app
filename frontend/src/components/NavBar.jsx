import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, LeafyGreen, Settings, User, X, Menu } from "lucide-react";

function NavBar() {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-base-100 border-b-4 border-primary-content border-solid fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className={`container mx-auto px-4 ${!menuOpen ? "h-14" : "h-16"}`}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <LeafyGreen className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-base font-bold">Shatapp</h1>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>

          {!menuOpen && (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to={"/settings"}
                className="btn btn-sm gap-2 transition-colors"
              >
                <Settings className="size-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link to={"/profile"} className="btn btn-sm gap-2">
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button className="flex gap-2 items-center" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hamburger menu for mobile, only visible when 'menuOpen' is true */}
      <div
        className={`lg:hidden ${
          menuOpen ? "block" : "hidden"
        } bg-base-200 px-4 shadow-lg`}
      >
        <Link
          to={"/settings"}
          className="block mb-4 text-lg font-semibold transition-colors"
          onClick={() => setMenuOpen(false)} // Close menu after clicking
        >
          <Settings className="inline mr-2" />
          Settings
        </Link>

        {authUser && (
          <>
            <Link
              to={"/profile"}
              className="block mb-4 text-lg font-semibold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <User className="inline mr-2" />
              Profile
            </Link>

            <button
              className="block mb-4 text-lg font-semibold transition-colors"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              <LogOut className="inline mr-2" />
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
