import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

function HomePage() {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 overflow-y-auto relative">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] relative">
          {/* Toggle Button for Mobile (Overlapping the Container) */}
          <button
            className="md:hidden fixed top-1/2 left-7 z-50 p-2 bg-primary text-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>

          <div className="flex h-full rounded-lg overflow-hidden relative">
            {/* Sidebar with Overlap Logic */}
            <div
              className={`fixed top-0 left-0 h-full z-40 bg-base-100 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${
                isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"
              } md:relative md:block md:w-64`}
            >
              <Sidebar />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 h-full overflow-y-auto md:ml-10">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
