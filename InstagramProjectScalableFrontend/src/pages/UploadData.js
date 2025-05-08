import React, { useState } from 'react';
import axios from 'axios';
import { server } from "../server"; // Example: const server = "http://localhost:5000/api"

const UploadData = () => {
    const [form, setForm] = useState({
        title: '',
        caption: '',
        location: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setForm({ ...form, file: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.file) {
            alert('Please select a video or image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', form.file);
        formData.append('title', form.title);
        formData.append('description', form.caption);
        formData.append('category', form.location);

        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                throw new Error("Authentication token not found");
            }

            const res = await axios.post(`${server}/upload-media`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                alert('Upload successful!');
                setForm({
                    title: '',
                    caption: '',
                    location: '',
                    file: null,
                });
            } else {
                alert('Upload failed: ' + res.data.message);
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('Error uploading media.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '120px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Upload Media</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input type="file" accept="video/*,image/*" name="file" onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="caption"
                        placeholder="Description"
                        value={form.caption}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="location"
                        placeholder="Category"
                        value={form.location}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadData;
