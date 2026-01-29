import React, { useState, useEffect } from 'react';
import styles from '../styles/Profile.module.css';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePic: '',
        role: 'user'
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tempData, setTempData] = useState({});

    // Fetch user data from MongoDB
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            // Replace with your actual API endpoint
            const response = await axios.get('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.data.success) {
                setUserData({
                    name: response.data.user.name || '',
                    email: response.data.user.email || '',
                    profilePic: response.data.user.profilePic || '/default-avatar.png',
                    role: response.data.user.role || 'user'
                });
                toast.success('Profile loaded successfully!');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load profile data');
            
            // Fallback to static data for demo
            setUserData({
                name: 'John Doe',
                email: 'john@example.com',
                profilePic: '/default-avatar.png',
                role: 'user'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        setTempData({ ...userData });
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setTempData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        if (!userData.name.trim() || !userData.email.trim()) {
            toast.error('Name and email are required');
            return;
        }

        try {
            setSaving(true);
            // Replace with your actual API endpoint
            const response = await axios.put('/api/user/update-profile', 
                {
                    name: userData.name,
                    email: userData.email
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                toast.success('Profile updated successfully!');
                setIsEditing(false);
                // Refresh data
                fetchUserData();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
            // Revert to previous data
            setUserData({ ...tempData });
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file type and size
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error('Image size should be less than 5MB');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('profilePic', file);

            const response = await axios.post('/api/user/upload-profile-pic', 
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                setUserData(prev => ({
                    ...prev,
                    profilePic: response.data.profilePicUrl
                }));
                toast.success('Profile picture updated!');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            toast.error('Failed to upload profile picture');
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <Toaster position="top-right" />
            
            {/* Header */}
            <div className={styles.profileHeader}>
                <h1 className={styles.profileTitle}>👤 User Profile</h1>
                <p className={styles.profileSubtitle}>Manage your personal information</p>
            </div>

            {/* Profile Card */}
            <div className={styles.profileCard}>
                {/* Profile Picture Section */}
                <div className={styles.profilePictureSection}>
                    <div className={styles.avatarContainer}>
                        <img 
                            src={userData.profilePic} 
                            alt="Profile" 
                            className={styles.profileAvatar}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                        <div className={styles.avatarOverlay}>
                            <label htmlFor="fileUpload" className={styles.uploadButton}>
                                📷 Change Photo
                            </label>
                            <input
                                type="file"
                                id="fileUpload"
                                className={styles.fileInput}
                                accept="image/*"
                                onChange={handleFileUpload}
                            />
                        </div>
                    </div>
                    <div className={styles.roleBadge}>
                        <span className={`${styles.roleIndicator} ${styles[userData.role]}`}>
                            {userData.role.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Profile Details */}
                <div className={styles.profileDetails}>
                    {/* Name Field */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            👤 Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className={styles.formInput}
                                placeholder="Enter your name"
                                disabled={saving}
                            />
                        ) : (
                            <div className={styles.staticField}>
                                {userData.name || 'Not set'}
                            </div>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            ✉️ Email Address
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className={styles.formInput}
                                placeholder="Enter your email"
                                disabled={saving}
                            />
                        ) : (
                            <div className={styles.staticField}>
                                {userData.email || 'Not set'}
                            </div>
                        )}
                    </div>

                    {/* Role Field (Read-only) */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            🎭 User Role
                        </label>
                        <div className={styles.staticField}>
                            <span className={`${styles.roleTag} ${styles[userData.role]}`}>
                                {userData.role.toUpperCase()}
                            </span>
                            <span className={styles.roleHint}>
                                (Role cannot be changed)
                            </span>
                        </div>
                    </div>

                    {/* Account Created Info */}
                    <div className={styles.accountInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Member Since:</span>
                            <span className={styles.infoValue}>January 2024</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Account Status:</span>
                            <span className={`${styles.statusBadge} ${styles.active}`}>
                                ✅ Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
                {isEditing ? (
                    <>
                        <button
                            className={`${styles.button} ${styles.saveButton}`}
                            onClick={handleSaveChanges}
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <span className={styles.spinnerSmall}></span>
                                    Saving...
                                </>
                            ) : (
                                '💾 Save Changes'
                            )}
                        </button>
                        <button
                            className={`${styles.button} ${styles.cancelButton}`}
                            onClick={handleCancelEdit}
                            disabled={saving}
                        >
                            ❌ Cancel
                        </button>
                    </>
                ) : (
                    <button
                        className={`${styles.button} ${styles.editButton}`}
                        onClick={handleEditClick}
                    >
                        ✏️ Edit Profile
                    </button>
                )}

                {/* Additional Actions */}
                <div className={styles.secondaryActions}>
                    <button className={styles.secondaryButton}>
                        🔑 Change Password
                    </button>
                    <button className={styles.secondaryButton}>
                        🔔 Notification Settings
                    </button>
                    <button className={`${styles.secondaryButton} ${styles.danger}`}>
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;