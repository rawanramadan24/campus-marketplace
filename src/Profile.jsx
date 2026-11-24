import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  
  const [user, setUser] = useState({
    fullName: 'Student Name',
    email: 'student@university.edu',
    department: 'Student Department',
    phone: 'Phone Number',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(user);
  const [message,setMessage]= useState({type:'',text:''});
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (current) {
      setUser(current);
      setDraft(current);
    }
  }, []);

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setDraft(user);
    setIsEditing(true);
    setMessage({ type: '', text: '' });
  };

  const handleCancel = () => {
    setDraft(user);
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!draft.fullName || !draft.department || !draft.phone) {
      setMessage({ type: 'error', text: 'من فضلك املأ كل الحقول' });
      return;
    }

    

    setUser(draft);
    localStorage.setItem('currentUser', JSON.stringify(draft));
    setIsEditing(false);
    const users= JSON.parse(localStorage.getItem('users')|| '[]');
    const updatedUsers=users.map(u=> u.email===user.email);
    localStorage.setItem('users',JSON.stringify(updatedUsers));
    setMessage({ type: 'success', text: 'profile updated succussfuly' });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <header className="profile-header">
          <h2>Student Profile</h2>
        </header>

        {message.text && (
          <div className={`message-box ${message.type}`}>{message.text}</div>
        )}

        {!isEditing && (
          <div className="profile-details">
            <div className="detail-row">
              <strong>Full Name:</strong>
              <span>{user.fullName}</span>
            </div>
            <div className="detail-row">
              <strong>University Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="detail-row">
              <strong>Department:</strong>
              <span>{user.department}</span>
            </div>
            <div className="detail-row">
              <strong>Phone:</strong>
              <span>{user.phone}</span>
            </div>

            <div className="profile-actions">
              <button type="button" className="btn-primary" onClick={handleEdit}>
                Edit Profile
              </button>
              <button type="button" className="btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}

        {isEditing && (
          <form className="profile-edit-form" onSubmit={handleSave}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={draft.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={draft.department}
                onChange={handleChange}
                placeholder="Enter your department"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={draft.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;