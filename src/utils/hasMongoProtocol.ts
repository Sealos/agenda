export function hasMongoProtocol(url: string): boolean {
    return /mongodb(?:\+srv)?:\/\/.*/.test(url);
}
