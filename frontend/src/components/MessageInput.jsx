import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, X, Smile, SendHorizonal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { sendMessage } = useChatStore();

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-scale-down rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-700
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="relative flex items-center w-full bg-transparent border rounded-lg p-2">
          <button
            type="button"
            className="mr-2"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={24} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-10 shadow-lg">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                emojiStyle="native"
                theme="auto"
              />
            </div>
          )}

          {/* Input area with image preview */}
          <div className="flex items-center flex-1 gap-2">
            <input
              type="text"
              className="flex-1 outline-none border-none bg-transparent"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            <Image size={24} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary px-3 py-2 text-sm"
          disabled={!text.trim() && !imagePreview}
        >
          <SendHorizonal size={24} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
