import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MdOutlineDeleteForever } from "react-icons/md";

export default function AdminPage() {
    const [list, setList] = useState([]);
    const [key, setKey] = useState(localStorage.getItem('adminKey') || '');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    async function fetchAll(k) {
        try {
            setLoading(true);
            setErr('');
            const { data } = await api.get('/api/admin/urls', {
                headers: { 'x-admin-key': k }
            });
            setList(data);
        } catch (e) {
            setErr(e?.response?.data?.message || 'Unauthorized / Error');
            setList([]);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        // console.log(id);
        if (!window.confirm('Are you sure you want to delete this URL?')) return;
        try {
            await api.delete(`/api/admin/urls/${id}`, {
                headers: { 'x-admin-key': key }
            });
            fetchAll(key);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (key) fetchAll(key);
    }, []);

    const handleGo = () => {
        localStorage.setItem('adminKey', key);
        fetchAll(key);
    };

    return (
        <div className="card">
            <h2>Admin – All Shortened URLs</h2>
            <div className="row">
                <input
                    placeholder="Enter admin key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    type="password"
                />
                <button onClick={handleGo} disabled={loading}>{loading ? 'Loading...' : 'Load'}</button>
            </div>
            {err && <p className="error">{err}</p>}
            <table className="table">
                <tbody>
                    <tr className='trow'>
                        <td>Short</td>
                        <td>Original</td>
                        <td>Clicks</td>
                        <td>Created</td>
                        <td>Delete</td>
                    </tr>
                    {list.map((u) => (
                        <tr className='trow' key={u._id} data-id={u._id}>
                            <td>
                                <a href={u.shortUrl} target="_blank" rel="noreferrer">
                                    {u.shortUrl}
                                </a>
                            </td>
                            <td className="truncate">{u.longUrl}</td>
                            <td>{u.clicks}</td>
                            <td>{new Date(u.createdAt).toLocaleString()}</td>
                            <td><MdOutlineDeleteForever className='delete' onClick={() => handleDelete(u._id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}