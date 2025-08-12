export default function avatarUrl(avatar: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    return `${baseUrl}/imgs/icons/avatars/${avatar}`;
}