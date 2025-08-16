import React, { useState } from 'react';
import { api } from '../services/api';
import ResultCard from './ResultCard';

export default function ShortenerForm() {
    const [longUrl, setLongUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setResult(null);
        if (!longUrl.trim()) return setError('Please enter a URL.');

        try {
            setLoading(true);
            const { data } = await api.post('/api/shorten', { longUrl });
            setResult(data);
            // console.log('Shortened URL:', data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
            setLongUrl('');
        }
    }

    return (
        <>
            <form className="card" onSubmit={handleSubmit}>
                <div className="row">
                    <input
                        type="url"
                        placeholder="Paste a long URL..."
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                    />
                    <button disabled={loading}>{loading ? 'Shortening...' : 'Shorten'}</button>
                </div>
                {error && <p className="error">{error}</p>}
            </form>

            {result && <ResultCard item={result} />}
        </>
    );
}
