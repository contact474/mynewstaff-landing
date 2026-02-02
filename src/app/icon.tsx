import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '50%', // This guarantees the circle shape
                }}
            >
                {/* Robot SVG */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Head */}
                    <rect x="3" y="6" width="18" height="14" rx="2" />
                    {/* Antenna */}
                    <path d="M12 3v3" />
                    <path d="M14 2a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                    {/* Eyes */}
                    <path d="M8 12h.01" />
                    <path d="M16 12h.01" />
                    {/* Mouth */}
                    <path d="M8 16h8" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    );
}
