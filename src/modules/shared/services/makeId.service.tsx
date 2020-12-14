export default function makeId(name) {
    return name.replace(/[^A-z0-9]/g, '_');
}
