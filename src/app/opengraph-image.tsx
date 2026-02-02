import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MyNewStaff.ai';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '10px solid white', // Optional styling for OG
                    }}
                >
                    {/* Scaled Robot SVG */}
                    <svg
                        width="300"
                        height="300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="6" width="18" height="14" rx="2" />
                        <path d="M12 3v3" />
                        <path d="M14 2a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                        <path d="M8 12h.01" />
                        <path d="M16 12h.01" />
                        <path d="M8 16h8" />
                    </svg>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
