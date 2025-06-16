import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/userApi";
import axios from "axios";
import useAuthStore from "../store/AuthStore";
import '../styles/UserProfile.css'

const UserProfilePage = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await getUserProfile(user.id);
      const userData = response.data;
      setProfile({
        id: userData.id,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUserProfile(user.id,profile);
      alert("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUser();
    }
  }, [user?.id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="user-profile-page" style={{ padding: "2rem" }}>
      <h2>User Profile</h2>
      <p><strong>Full Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>
      <p><strong>Address:</strong> {profile.address || "Not provided"}</p>

      <button onClick={() => setIsModalOpen(true)}>Update Profile</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <label>Full Name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <label>Phone</label>
            <input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <label>Address</label>
            <input
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />

            <input
              value={profile.email}
              onChange={(e)=> setProfile({...profile,email: e.target.value})}
            />

            

            <div className="modal-actions">
              <button onClick={handleUpdate}>Save Changes</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
