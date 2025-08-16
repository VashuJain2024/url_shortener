import React from 'react';

export default function ResultCard({ item }) {
    const { shortUrl, longUrl, clicks, code } = item;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            alert('Link Copied!');
        } catch {
            alert('Copy failed');
        }
    };

    return (
        <div className="card">
            <p>
                <strong>Short:</strong> <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
                &nbsp; <button onClick={copy}>Copy</button>
            </p>
            <p><strong>Original:</strong> {longUrl}</p>
        </div>
    );
}
