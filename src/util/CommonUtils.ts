
export function generateUniqueName(prefix = 'Test'): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}
