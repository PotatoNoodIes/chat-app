import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, LeafyGreen, Settings, User } from "lucide-react";

function NavBar() {
  const { logout, authUser } = useAuthStore();

  const handleLogout = () => {
    window.google.accounts.id.revoke("user_email", () => {
      console.log("Google account logged out");
    });

    logout();
  };
  return (
    <header className="bg-base-100 border-b-4 border-primary-content border-solid fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-12">
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

          <div className="flex items-center gap-2">
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

                <button
                  className="flex gap-2 items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
