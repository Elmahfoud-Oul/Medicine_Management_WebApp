import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { updateEmail, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faPen, faTrash, faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from "./modal";
import Label from "./label";
import User from '../abstract-user-flat-4.png';
import "./profile.css";
import Conexion from "./conexion";
import DeleteModal from "./delete";
import AppLayout from "../Home/Laayout/hmLaayout";


export default function Profil() {
  const [userDetails, setUserDetails] = useState(null);
  const [openNameMod, setOpenNameMod] = useState(false);
  const [openEmailMod, setOpenEmailMod] = useState(false);
  const [openPassMod, setOpenPassMod] = useState(false);
  const [openDeleteMod, setOpenDeleteMod] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      }
    };

    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUserData();
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (err) {
      console.error(err.message);
    }
  };

  const reauthenticate = async (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
  };

  const handleUpdateEmail = async (newEmail, currentPassword) => {
    if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
      setError("Enter a valid email");
      return;
    }
    try {
      await reauthenticate(currentPassword);
      const user = auth.currentUser;
      await updateEmail(user, newEmail);
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, { email: newEmail });
      setUserDetails(prev => ({ ...prev, email: newEmail }));
      setOpenEmailMod(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePassword = async (newPassword, currentPassword) => {
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      await reauthenticate(currentPassword);
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      setOpenPassMod(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateName = async (firstName, lastName) => {
    if (!firstName || !lastName) {
      setError("Both first and last name are required");
      return;
    }
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, { firstName, lastName });
      setUserDetails(prev => ({ ...prev, firstName, lastName }));
      setOpenNameMod(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!userDetails) return <p>Loading...</p>;

  const handleDeleteAccount = async (currentPassword) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, "Users", user.uid));
      await deleteUser(user);
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, `profilePhotos/${user.uid}.jpg`);

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const finalUrl = url + "?v=" + Date.now();

      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, { photo: finalUrl });

      setUserDetails(prev => ({ ...prev, photo: finalUrl }));

    } catch (err) {
      console.error("Error uploading photo:", err);
    }
  };


  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="pak">
        <div className="photo-container">
          {/* <img src={userDetails.photo || User} alt="Profile" className="img" /> */}
          <img
            src={userDetails.photo || User}
            alt="Profile"
            className="img"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '50%',
              display: 'block'
            }}
            onError={(e) => { e.target.src = User; }}
          />        
          <label htmlFor="photoInput" className="photomodif"style={{background:"#17d4b8"}}>
            <FontAwesomeIcon icon={faPen} style={{ color: "white", background: "#17d4b8" }} />
          </label>
          <input
            type="file"
            id="photoInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </div>

        <p className="name">{userDetails.firstName}</p>
        <label className="labeles">PERSONAL DETAILL :</label>

        <Label
          label="Full name"
          con={<FontAwesomeIcon icon={faUser} style={{ color: "#17d4b8" }} />}
          valeur={`${userDetails.firstName} ${userDetails.lastName}`}
          className="fullname"
          type="text"
          click={() => setOpenNameMod(true)}
        />

        <Label
          label="Email"
          con={<FontAwesomeIcon icon={faEnvelope} style={{ color: "#17d4b8" }} />}
          valeur={userDetails.email}
          className="email"
          type="email"
          click={() => setOpenEmailMod(true)}
        />

        <Label
          label="Password"
          con={<FontAwesomeIcon icon={faLock} style={{ color: "#17d4b8" }} />}
          valeur="••••••"
          className="password"
          type="password"
          click={() => setOpenPassMod(true)}
        />

        <Conexion
          label="CONEXION :"
          con={<FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#eb0c0cff" }} />}
          valeur="Logout"
          className="logout"
          click={handleLogout}
        />

        <Conexion
          label="UNSUBSCRIBE :"
          con={<FontAwesomeIcon icon={faTrash} />}
          valeur="Delete"
          className="delete"
          click={() => setOpenDeleteMod(true)}
        />


        <DeleteModal
          open={openDeleteMod}
          onClose={() => { setOpenDeleteMod(false); setError(""); }}
          onDelete={(currentPassword) => handleDeleteAccount(currentPassword)}
          error={error}
        />

        <Modal
          open={openNameMod}
          onClose={() => { setOpenNameMod(false); setError(""); }}
          label="First Name"
          type="text"
          label2="Last Name"
          type2="text"
          valeur1={userDetails.firstName}
          valeur2={userDetails.lastName}
          onSubmit={(first, last) => handleUpdateName(first, last)}
          error={error}
        />

        <Modal
          open={openEmailMod}
          onClose={() => { setOpenEmailMod(false); setError(""); }}
          label="Password"
          type="password"
          label2="New Email"
          type2="email"
          onSubmit={(currentPass, newEmail) => handleUpdateEmail(newEmail, currentPass)}
          error={error}
        />

        <Modal
          open={openPassMod}
          onClose={() => { setOpenPassMod(false); setError(""); }}
          label=" Password"
          type="password"
          label2="New Password"
          type2="password"
          onSubmit={(currentPass, newPass) => handleUpdatePassword(newPass, currentPass)}
          error={error}
        />



      </div>
    </AppLayout>
  );
}
