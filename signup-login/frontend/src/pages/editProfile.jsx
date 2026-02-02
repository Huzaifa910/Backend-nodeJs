// import React, { useState, useEffect } from "react";
// import  "../styles/editProfile.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EditProfile = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // 🔹 Get current profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           import.meta.env.VITE_API_URL + "/user/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         setName(res.data.name);
//         setEmail(res.data.email);
//       } catch (error) {
//         alert("Profile load failed");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // 🔹 Update profile
//   const handleSave = async () => {
//     if (!name || !email) {
//       alert("Name and email required");
//       return;
//     }

//     try {
//       setSaving(true);
//       await axios.put(
//         import.meta.env.VITE_API_URL + "/user/update-profile",
//         { name, email },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("Profile updated successfully");
//       navigate("/profile");
//     } catch (error) {
//       alert("Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className={styles.loading}>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <h2>Edit Profile</h2>

//       <div className={styles.formGroup}>
//         <label>Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           disabled
//         />
//       </div>

//       <div className={styles.buttons}>
//         <button onClick={handleSave} disabled={saving}>
//           {saving ? "Saving..." : "Save"}
//         </button>

//         <button
//           className={styles.cancel}
//           onClick={() => navigate("/profile")}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



import React, { useState, useEffect } from "react";
import "../styles/editProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setName(res.data.name);
        setEmail(res.data.email);
      } catch {
        alert("Profile load failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!name || !email) {
      alert("Name and email required");
      return;
    }

    try {
      setSaving(true);
      await axios.put(
        import.meta.env.VITE_API_URL + "/user/update-profile",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile updated successfully");
      navigate("/profile");
    } catch {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="edit-loading">Loading...</p>;

  return (
    <div className="edit-container">
      <h2>Edit Profile</h2>

      <div className="edit-formGroup">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="edit-formGroup">
        <label>Email</label>
        <input type="email" value={email} disabled />
      </div>

      <div className="edit-buttons">
        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>

        <button className="edit-cancel" onClick={() => navigate("/profile")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
