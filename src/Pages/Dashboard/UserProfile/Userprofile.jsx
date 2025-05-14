import React, { useContext, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

export const Userprofile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.photo || "");
  const [uploading, setUploading] = useState(false);

  // Fetch user data from server
  const getUserData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        // Update context and local state with the fetched user data
        setUser(data.user);
        setName(data.user.name);
        setPhoto(data.user.photo);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching user data");
    }
  };

  // Load user data on initial render
  useEffect(() => {
    getUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        setPhoto(data.data.url);
        toast.success("Image uploaded");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      toast.error("Upload error");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, photo }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Profile updated");
        setUser((prev) => ({ ...prev, name, photo })); 
        await getUserData();
        setIsEditing(false);
      } else {
        toast.error(result.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update error");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative">
        <img
          src={photo}
          alt="User Profile"
          className="w-32 h-32 rounded-full border-4 border-[#b99543] object-cover"
        />
        <button
          className="absolute bottom-0 right-0 bg-[#b99543] text-white p-1 rounded-full"
          onClick={handleEditToggle}
        >
          <Pencil size={16} />
        </button>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-gray-800">{name}</h2>
      <h2 className="mt-1 text-sm text-gray-500">{user?.role}</h2>

      {isEditing && (
        <div className="mt-6 w-64 space-y-4">
          <input
            type="text"
            placeholder="Update Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b99543]"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

          <button
            onClick={handleSave}
            disabled={uploading}
            className="w-full bg-[#b99543] text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            {uploading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
};
